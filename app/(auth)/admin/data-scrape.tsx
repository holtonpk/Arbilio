"use client";

import React, {
  useState,
  useEffect,
  Fragment,
  CSSProperties,
  useRef,
} from "react";
import { Transition, Listbox } from "@headlessui/react";
import { timeSince, convertImageToFile } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { db } from "@/context/Auth";
import {
  doc,
  collection,
  getDocs,
  query,
  limit,
  getDoc,
  setDoc,
  deleteDoc,
  orderBy,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { siteConfig } from "@/config/site";

export default function DataScrape() {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    async function getLastUpdate() {
      try {
        const records = await getDocs(
          query(collection(db, "updateLogs"), orderBy("time", "desc"))
        );
        setData(records.docs);
      } catch (error) {}
    }
    getLastUpdate();
  }, []);

  return (
    <>
      {data ? (
        <>
          <UpdateData data={data} />
          <UpdateTable updates={data} />
        </>
      ) : (
        <>loading..</>
      )}
    </>
  );
}

const UpdateTable = ({ updates }: any) => {
  return (
    <div className="flex flex-col w-full mx-auto border  p-4 rounded-md">
      <div className="w-full flex items-center  h-fit p-4 rounded-md justify-between">
        <div className="w-[30%] text-primary ">Data</div>
        <div className="w-[30%] text-primary">time</div>
        <div className="w-[30%] text-primary">timeSince</div>
      </div>
      <div className="flex flex-col divide-y divide-border rounded-md border  mt-2 max-h-[50vh] overflow-scroll">
        {updates &&
          updates.map((update: any, indx: number) => {
            const timestamp = update.data().time;
            const date = new Date(
              timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
            );

            // convert the date to Mountain Standard Time
            const options: Intl.DateTimeFormatOptions = {
              timeZone: "America/Denver",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            };
            let mstDate = new Intl.DateTimeFormat("en-US", options).format(
              date
            );

            // remove leading zeroes and replace ',' with '@'
            mstDate = mstDate.replace(/\b0+/g, "").replace(",", "@");

            return (
              <div
                key={indx}
                className="  p-2 h-20 w-full flex items-center justify-between"
              >
                <div className="w-[30%] text-primary">{update.data().data}</div>
                <div className="w-[30%] text-primary">{mstDate}</div>
                <div className="w-[30%] text-primary">
                  {timeSince(date.getTime() / 1000)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const UpdateData = ({ data }: any) => {
  const updateTypes = [
    { label: "Account Data", value: "accountData" },
    { label: "Account & Post Data", value: "accountsPosts" },
  ];
  const timestamp = data[0].data().time;
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  const updateStepsRef = useRef<HTMLDivElement>(null);
  const [updating, setUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [failList, setFailList] = useState<string[]>([]);
  const [syncComplete, setSyncComplete] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | undefined>(
    (data.length > 0 && timeSince(date.getTime() / 1000)) || undefined
  );
  const [isShowing, setIsShowing] = useState(false);
  const [selectedUpdateType, setSelectedUpdateType] = useState<any>(
    updateTypes[0]
  );
  const [updateSteps, setUpdateSteps] = useState<string[]>([]);
  // const [forceStop, setForceStop] = useState(false);
  const forceStopRef = useRef(false);

  const fetchJson = async (url: string) => {
    const res = await fetch(url);
    return res.json();
  };

  // Function to fetch and validate the JSON data
  const fetchAndValidate = async (url: string, expectedData: string[]) => {
    const data = await fetchJson(url);
    // Check if the expected data exists
    if (expectedData.every((key) => data.hasOwnProperty(key))) {
      return data;
    } else {
      console.error("Unexpected data format:", data);
      throw new Error("Unexpected data format");
    }
  };

  // Function to scrape account data
  const ScrapeAccountData = (uniqueId: string) =>
    fetchAndValidate(`${siteConfig.url}/api/scrape/account/${uniqueId}`, [
      "posts",
    ]);

  // Function to scrape post data
  const ScrapePostData = (uniqueId: string, postId: string) =>
    fetchAndValidate(
      `${siteConfig.url}/api/scrape/post/${uniqueId}/${postId}`,
      ["video", "cover"]
    );

  // Function to create a new post
  const CreateNewPost = async (
    postId: string,
    coverImageUrl: string,
    newPostData: any
  ) => {
    const response = await fetch(coverImageUrl);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append("cover", blob);
    formData.append("postId", postId);
    formData.append("postData", JSON.stringify(newPostData));
    const record = await addDoc(collection(db, "posts"), formData);
    return record.id;
  };

  // Function to update account data
  const UpdateAccountData = (recordId: string, data: any) =>
    updateDoc(doc(db, "tiktokAccounts", recordId), data);

  // Function to fetch account data and handle possible errors
  async function fetchAccountData(uniqueID: string) {
    try {
      const response = await fetch(
        `${siteConfig.url}/api/scrape/user/${uniqueID}`
      );
      if (response.ok) {
        const data = await response.json();
        return { success: data };
      }
      throw new Error(`Error fetching data: ${response.status}`);
    } catch (error) {
      return { error };
    }
  }

  // Function to update the message
  const updateMessage = (text: string) =>
    setUpdateSteps((prevSteps) => [...prevSteps, text]);

  // Function to update account data and handle possible errors
  const updateAccountData = async (record: any) => {
    const { uniqueId, id } = record.data();
    updateMessage(`fetching data for ${uniqueId}`);
    const res = await fetchAccountData(uniqueId);
    if (res.success) {
      const data = res.success;
      const dataCollectionTime = new Date().getTime();
      const accountStats = [
        { dataCollectionTime, ...data.json.userInfo.stats },
        ...(record.data()?.accountStats || []),
      ];
      await UpdateAccountData(id, {
        userInfo: data.json.userInfo,
        accountStats,
      });
      updateMessage(`✅ successfully updated data for ${uniqueId}`);
    } else if (res.error) {
      const addBadDoc = doc(db, "tiktokBadAccounts", id);
      await setDoc(addBadDoc, record.data());
      updateMessage(`🚫 failed to update data for ${uniqueId}`);
      console.error("Error updating data:", res.error);
      updateMessage(`error ==> ${res.error}`);
    }
  };

  const GetNewTopPosts = async (posts: any[]) => {
    return posts.sort((a, b) => b.playCount - a.playCount).slice(0, 5);
  };

  const ConfigAccountsPosts = async (
    uniqueId: string,
    recordId: string,
    newPostData: any
  ) => {
    const newTopPosts = await GetNewTopPosts(newPostData);

    const top5PostsRelationPromises = newTopPosts.map(async (post: any) => {
      try {
        // const postExists = await pb
        //   .collection("posts")
        //   .getFirstListItem(`postId="${post.id}"`);
        const postExists = await getDocs(
          query(collection(db, "tiktokPosts"), where("postId", "==", post.id))
        );
        return postExists.docs[0]?.id;
      } catch (e) {
        // const postId = post.id;
        // const postData = await ScrapePostData(uniqueId, postId);
        // const newPost = await CreateNewPost(
        //   postId,
        //   postData.video.cover,
        //   postData
        // );
        // return newPost;
        try {
          // ...
          const postId = post.id;
          const newPostData = await ScrapePostData(uniqueId, postId);
          const newPost = await CreateNewPost(
            postId,
            newPostData.video.cover,
            newPostData
          );
          return await newPost;
        } catch (error) {
          console.error(`Error creating new post ${post.id}:`, error);
          setUpdateSteps((prevSteps) => [
            ...prevSteps,
            `Error creating new post ${post.id}:${error}`,
          ]);
        }
      }
    });

    const top5PostsRelation = await Promise.all(top5PostsRelationPromises);
    await UpdateAccountData(recordId, { topPosts: top5PostsRelation });
  };

  // Main update function
  const Update = async () => {
    setUpdating(true);
    updateMessage("Fetching data...");

    const records = await getDocs(collection(db, "tiktokAccounts"));
    const totalRecords = records.docs.length;

    // If slicing is necessary, uncomment the following line.
    // const slicedRecords = records.docs.slice(0, totalRecords);
    const updateTasks = records.docs.map(async (record) => {
      if (forceStopRef.current) return;

      const { uniqueId, id } = record.data();
      try {
        if (selectedUpdateType.value === "accountsPosts") {
          const newData = await ScrapeAccountData(uniqueId);
          await ConfigAccountsPosts(uniqueId, id, newData.posts);
        } else if (selectedUpdateType.value === "accountData") {
          await updateAccountData(record);
        }

        updateMessage(
          `✅ Successfully updated ${selectedUpdateType.value} for ${uniqueId}`
        );
      } catch (error) {
        const addBadDoc = doc(db, "tiktokBadAccounts", id);
        await setDoc(addBadDoc, record);

        updateMessage(
          `🚫 Failed to update ${selectedUpdateType.value} for ${uniqueId}`
        );
        console.error(`Error updating data for ${uniqueId}:`, error);
        updateMessage(`Error ==> ${JSON.stringify(error)}`);
      }
    });

    await Promise.all(updateTasks);

    // Calculate progress only once after all updates are done.
    setProgress(
      (prevProgress) => prevProgress + (updateTasks.length / totalRecords) * 100
    );

    await addDoc(collection(db, "updateLogs"), {
      data: selectedUpdateType.value,
      time: new Date(),
    });

    setSyncComplete(true);
  };

  useEffect(() => {
    // Scroll to the bottom of the updateSteps div whenever it is updated
    if (updateStepsRef.current) {
      updateStepsRef.current.scrollTo({
        top: updateStepsRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [updateSteps]);

  return (
    <>
      <div className="flex items-center gap-4 justify-end ml-auto text-primary/70 absolute right-4 top-4">
        <Icons.refresh className="h-5 w-5 text-primary" />
        <span className="text-base ">{"Last updated " + lastUpdate}</span>
      </div>

      <div className=" h-fit p-4 gap-3 items-center bg-background border w-full rounded-md   z-40 flex flex-row">
        <Listbox value={selectedUpdateType} onChange={setSelectedUpdateType}>
          <div className="w-full flex-grow relative z-50">
            <Listbox.Button className="text-sm relative w-full cursor-default rounded-lg border text-primary  py-2 pl-3 pr-10 text-left shadow-md ">
              <span className="block truncate">{selectedUpdateType.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <Icons.chevronUp
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 px-2    h-fit z-50  w-full overflow-auto rounded-md  border bg-background  py-1 text-base shadow-lg ">
                {updateTypes.map((item: any, Idx: number) => (
                  <Listbox.Option
                    key={Idx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-8 pr-3 ${
                        active
                          ? "bg-muted rounded-md text-primary"
                          : "text-primary"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.label}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                            <Icons.check
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        <Button
          onClick={Update}
          className="flex items-center justify-center whitespace-nowrap  gap-2 "
          variant="default"
          size="lg"
        >
          <Icons.download className="h-5 w-5 inline-block" />
          Start Sync
        </Button>
      </div>
      {updating && (
        <div className=" w-full h-fit p-4 gap-4  border  blurBack  rounded-md   flex flex-col relative">
          <div className="flex gap-2 absolute top-4 right-4">
            <button
              onClick={() => {
                // setForceStop(true);
                forceStopRef.current = true;
                setProgress(0);
              }}
              className=" hover:opacity-50 text-destructive"
            >
              stop
            </button>
            <button
              onClick={() => {
                setUpdateSteps([]);
                setProgress(0);
                setUpdating(false);
                forceStopRef.current = false;
              }}
              className=" hover:opacity-50"
            >
              clear
            </button>
          </div>
          <>
            <div className="flex flex-col text-primary">
              Syncing {selectedUpdateType.label}
              <div className="text-sm font-bold">
                {progress.toFixed(2) + "%"}
              </div>
            </div>

            <StatusBar percentComplete={progress} />
          </>
          <div
            ref={updateStepsRef}
            className="flex flex-col max-h-36 border overflow-scroll rounded-md"
          >
            {updateSteps.map((step: string, indx: number) => (
              <div key={indx} className="w-full  text-primary px-4 rounded-md">
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
      {failList.length > 0 && (
        <div className="flex flex-col w-full">
          <h1 className="text-primary">{`Failures (${failList.length})`}</h1>
          <div className="flex flex-col  rounded-md border max-h-[200px] overflow-scroll p-4">
            {failList.map((item: any, idx: number) => (
              <h2 key={idx}>{item}</h2>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

interface StatusBarProps {
  percentComplete: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ percentComplete }) => {
  const progressBarStyle = {
    width: `${percentComplete}%`,
  };

  return (
    <>
      <div className="border   h-4 w-full relative overflow-hidden rounded-md">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full "
          style={progressBarStyle}
        />
      </div>
    </>
  );
};

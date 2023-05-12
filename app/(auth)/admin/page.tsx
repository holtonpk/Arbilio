"use client";

import React, {
  useState,
  useEffect,
  Fragment,
  CSSProperties,
  useRef,
} from "react";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { IoMdRefresh } from "react-icons/io";
import { BsFillCheckCircleFill, BsCheck } from "react-icons/bs";
import { Transition, Listbox } from "@headlessui/react";
import { timeSince, convertImageToFile } from "@/lib/utils";
import { MdClose, MdCloudDownload } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { db } from "@/context/Auth";
import {
  doc,
  collection,
  getDocs,
  query,
  limit,
  getDoc,
  orderBy,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";

const AdminLayout = () => {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    async function getLastUpdate() {
      try {
        const records = await getDocs(
          query(collection(db, "updateLogs"), orderBy("created", "desc"))
        );
        setData(records.docs);
      } catch (error) {}
    }
    getLastUpdate();
  }, []);

  return (
    <>
      {data ? (
        <div className="flex flex-col items-center p-8 gap-4 w-[50vw] mx-auto">
          <DataStats />
          <UpdateData data={data} />
          <UpdateTable updates={data} />
        </div>
      ) : (
        "Lading..."
      )}
    </>
  );
};

export default AdminLayout;

const DataStats = (data: any) => {
  const [accountData, setAccountData] = useState<any>(undefined);
  const [productData, setProductData] = useState<any>(undefined);

  const accountDataFetched = useRef(false);
  const productDataFetched = useRef(false);

  useEffect(() => {
    async function getAccountData() {
      console.log("fetching account data");
      // const records = await pb.collection("accounts").getFullList();
      const records = await getDocs(collection(db, "tiktokAccounts"));

      setAccountData(records.docs);
      accountDataFetched.current = true;
    }
    if (!accountDataFetched.current) {
      getAccountData();
    }
  }, []);

  useEffect(() => {
    async function getProductData() {
      const records = await getDocs(collection(db, "tiktokProducts"));
      setProductData(records.docs);
      productDataFetched.current = true;
    }
    if (!productDataFetched.current) {
      getProductData();
    }
  }, []);

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col border rounded-md items-center p-2">
        <h1 className="text-muted-foreground">Total products</h1>
        <h2>{productData?.length}</h2>
      </div>
      <div className="flex flex-col border rounded-md items-center p-2">
        <h1 className="text-muted-foreground">Total accounts</h1>
        <h2>{accountData?.length}</h2>
      </div>
    </div>
  );
};

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
          updates.map((update: any, indx: number) => (
            <div
              key={indx}
              className="  p-2 h-20 w-full flex items-center justify-between"
            >
              <div className="w-[30%] text-primary">{update.data().data}</div>
              <div className="w-[30%] text-primary">{update.data().time}</div>
              <div className="w-[30%] text-primary">
                {timeSince(new Date(update.data().time).getTime() / 1000)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const UpdateData = ({ data }: any) => {
  console.log("rr", data);
  const updateTypes = [
    { label: "Account Data", value: "accountData" },
    { label: "Account & Post Data", value: "accountsPosts" },
  ];

  const updateStepsRef = useRef<HTMLDivElement>(null);
  const [updating, setUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [failList, setFailList] = useState<string[]>([]);
  const [syncComplete, setSyncComplete] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | undefined>(
    timeSince(new Date(data[0].data().time).getTime() / 1000)
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

  const ScrapeAccountData = async (uniqueId: string) => {
    const data = await fetchJson(
      `http://localhost:3000/api/scrape/account/${uniqueId}`
    );
    if (data && data.posts) {
      return data;
    } else {
      console.error("Unexpected data format:", data);
      throw new Error("Unexpected data format");
    }
  };

  const ScrapePostData = async (uniqueId: string, postId: string) => {
    const data = await fetchJson(
      `http://localhost:3000/api/scrape/post/${uniqueId}/${postId}`
    );
    if (data && data.video && data.video.cover) {
      return data;
    } else {
      console.error("Unexpected data format:", data);
      throw new Error("Unexpected data format");
    }
  };

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
    // const record = await pb.collection("posts").create(formData);
    const record = await addDoc(collection(db, "posts"), formData);

    return record.id;
  };

  const GetNewTopPosts = async (posts: any[]) => {
    return posts.sort((a, b) => b.playCount - a.playCount).slice(0, 5);
  };

  const UpdateAccountData = async (recordId: string, data: any) => {
    // await pb.collection("accounts").update(recordId, data);
    await updateDoc(doc(db, "tiktokAccounts", recordId), data);
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

  async function fetchAccountData(uniqueID: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${uniqueID}`
      );
      if (response.status === 200) {
        const data = await response.json();
        if (response.ok) {
          return { success: data };
        }
        throw new Error(`Error fetching data: ${data.message}`);
      } else if (response.status === 500) {
        return { error: response };
      } else {
        return {
          error: new Error(`Unexpected response status: ${response.status}`),
        };
      }
    } catch (error) {
      // console.log("Error fetching data:", response);
      return { error: error };
    }
  }

  const updateAccountData = async (record: any) => {
    const { uniqueId, id } = record.data();
    updateMessage(`fetching data for ${uniqueId}`);
    const res = await fetchAccountData(uniqueId);
    if (res.success) {
      const data = res.success;
      console.log("data:", data);
      const dataCollectionTime = new Date().getTime();
      const accountStats = [
        { dataCollectionTime, ...data.json.userInfo.stats },
        ...(record.data()?.accountStats || []),
      ];
      await updateDoc(doc(db, "tiktokAccounts", id), {
        userInfo: data.json.userInfo,
        accountStats: accountStats,
      });
      updateMessage(`✅ successfully updated data for ${uniqueId}`);
    } else if (res.error) {
      setFailList((prevList) => [...prevList, uniqueId]);
      updateMessage(`🚫 failed to update data for ${uniqueId}`);
      console.error("Error updating data:", res.error);
      updateMessage(`error ==> ${res.error}`);
    }
  };

  const Update = async () => {
    setUpdating(true);

    const records = await getDocs(collection(db, "tiktokAccounts"));
    console.log("record1:", records);

    // const totalRecords = records.docs.length;
    const totalRecords = 1;
    const slicedRecords = records.docs.slice(0, totalRecords);

    for (const record of slicedRecords) {
      if (forceStopRef.current) {
        break;
      }
      // const record = slicedRecords[index];
      const { uniqueId, id } = record.data();
      updateMessage(`Updating... ${uniqueId}`);
      try {
        if (selectedUpdateType.value == "accountsPosts") {
          updateMessage(`scraping data for ${uniqueId}...`);
          const newData = await ScrapeAccountData(uniqueId);
          updateMessage(`updating posts for ${uniqueId}.....`);
          await ConfigAccountsPosts(uniqueId, id, newData.posts);
          updateMessage(
            `✅ successfully updated account & posts for ${uniqueId}`
          );
        } else if (selectedUpdateType.value == "accountData") {
          await updateAccountData(record);
        }
      } catch (error) {
        updateMessage(`Error updating ${uniqueId}:${error}`);
      }
      // If you want to add functionality for "Account Data" updates, you can add it here.
      setProgress((prevProgress) => prevProgress + (1 / totalRecords) * 100);
    }
    await addDoc(collection(db, "updateLogs"), {
      data: selectedUpdateType.value,
      time: new Date().toISOString(),
    });
    setSyncComplete(true);
  };

  const updateMessage = (text: string) => {
    setUpdateSteps((prevSteps) => [...prevSteps, text]);
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
        <IoMdRefresh className="h-5 w-5 text-primary" />
        <span className="text-base ">{"Last updated " + lastUpdate}</span>
      </div>

      <div className=" h-fit p-4 gap-3 items-center bg-background border w-full rounded-md   z-40 flex flex-row">
        <Listbox value={selectedUpdateType} onChange={setSelectedUpdateType}>
          <div className="w-full flex-grow relative z-50">
            <Listbox.Button className="text-sm relative w-full cursor-default rounded-lg border text-primary  py-2 pl-3 pr-10 text-left shadow-md ">
              <span className="block truncate">{selectedUpdateType.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HiOutlineChevronUpDown
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
                            <BsCheck className="h-5 w-5" aria-hidden="true" />
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
          <MdCloudDownload className="h-5 w-5 inline-block" />
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

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
import { db } from "@/context/user-auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  doc,
  collection,
  getDocs,
  query,
  limit,
  startAt,
  getDoc,
  setDoc,
  deleteDoc,
  orderBy,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { siteConfig } from "@/config/site";
import { AccountStatsResponse } from "@/types";
import { record } from "zod";
import { to } from "react-spring";
import { ca } from "date-fns/locale";
import { storage as DataStorage } from "@/config/data-storage";

export default function DataScrape() {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    async function getLastUpdate() {
      try {
        const records = await getDocs(
          query(collection(db, DataStorage.updateLogs), orderBy("time", "desc"))
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
        <div className="w-[30%] text-primary">startAfter</div>
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
                <div className="w-[30%] text-primary">
                  {update.data().startAfter}
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
    { label: "Account Stats", value: "accountsStats" },
    { label: "Account Info", value: "accountInfo" },
    { label: "Account Posts", value: "accountsPosts" },
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
  const [selectedUpdateType, setSelectedUpdateType] = useState<any>(
    updateTypes[0]
  );
  const [updateSteps, setUpdateSteps] = useState<string[]>([]);
  const forceStopRef = useRef(false);

  // Function to update the message
  const updateMessage = (text: string) =>
    setUpdateSteps((prevSteps) => [...prevSteps, text]);

  const fetchStartAfter = async (data: string) => {
    const q = query(
      collection(db, DataStorage.updateLogs),
      where("data", "==", data),
      orderBy("time", "desc")
    );
    const doc = await getDocs(q);
    const lastDoc = doc.docs[0].data();
    return lastDoc.startAfter;
  };

  //=========> Function to update account info and handle possible errors <=========================
  const UpdateAccountInfo = async () => {
    updateMessage("Fetching data...");
    try {
      const startAfter = await fetchStartAfter("accountInfo");
      const startAfterSnapshot = await getDoc(
        doc(db, DataStorage.accounts, startAfter)
      );
      const availableCredits = await fetchAvailableCredits();
      const q = query(
        collection(db, DataStorage.accounts),
        limit(availableCredits),
        startAt(startAfterSnapshot)
      );
      const res = await getDocs(q);
      const records = res.docs;
      const totalRecords = records.length;
      updateMessage("Updating account info...");
      for (let i = 0; i < totalRecords; i++) {
        if (forceStopRef.current) break;
        const record = records[i];
        const { uniqueId, id, userInfo } = record.data();

        // set Criteria for updating account info
        if (!userInfo) {
          try {
            updateMessage(`Fetching info for ${uniqueId}`);

            const response = await fetch(
              `${siteConfig.url}/api/scrape/user/${uniqueId}`
            );
            const data = await response.json();

            await updateDoc(doc(db, DataStorage.accounts, id), {
              userInfo: data.json.userInfo,
            });

            updateMessage(`✅ Successfully updated data for ${uniqueId}`);
          } catch (error) {
            console.error(`Error updating info for ${uniqueId}:`, error);
            updateMessage(`🚫 Failed to update info for ${uniqueId}`);
            updateMessage(`Error ==> ${error}`);
            const addBadDoc = doc(db, "tiktokBadAccounts", id);
            await setDoc(addBadDoc, { id: record.data().id });
          }
        }

        setProgress((prevProgress) => prevProgress + (1 / totalRecords) * 100);
      }

      updateMessage("Account info update completed!");
      return records[records.length - 1].id;
    } catch (error) {
      console.error("Error fetching data: ", error);
      updateMessage("Error fetching data!");
      return "";
    }
  };

  //=========> Function to update account stats and handle possible errors <=========================
  const UpdateAccountStats = async () => {
    try {
      updateMessage("Fetching data...");

      const response = await fetch(`${siteConfig.url}/api/scrape/following`);
      const res = await response.json();
      const records = res.data as AccountStatsResponse[];
      const totalRecords = records.length;

      updateMessage("Updating account data...");

      for (let i = 0; i < totalRecords; i++) {
        try {
          const account = records[i];

          const collectionRef = collection(db, DataStorage.accounts);
          const q = query(
            collectionRef,
            where("secUid", "==", account.user.secUid)
          );
          const querySnapshot = await getDocs(q);
          const record = querySnapshot.docs[0];

          if (!record) {
            updateMessage(
              `No existing record found for account ${account.user.uniqueId}, creating a new one.`
            );
            await addNewAccountToDb(account);
          } else {
            updateMessage(`Updating ${account.user.uniqueId}`);

            const dataCollectionTime = new Date().getTime();
            const accountStats = [
              { dataCollectionTime, ...account.stats },
              ...(record.data()?.accountStats || []),
            ];
            await updateDoc(doc(collectionRef, record.id), { accountStats });
          }
          updateMessage(
            `✅ successfully updated data for ${records[i].user.uniqueId}`
          );
        } catch (error) {
          const addBadDoc = doc(db, "tiktokBadAccounts", records[i].user.id);
          await setDoc(addBadDoc, { id: records[i].user.id });
          console.error(
            `🚫 Error updating account ${records[i].user.uniqueId}:`,
            error
          );
        }
        setProgress((prevProgress) => prevProgress + (1 / totalRecords) * 100);
      }

      updateMessage("✅ Account data update completed!✅ ");
    } catch (error) {
      console.error("🚫Error fetching data: ", error);
      updateMessage("Error fetching data!");
    }
  };

  //=========> Function to update account posts and handle possible errors <=========================

  const UpdateAccountPosts = async () => {
    updateMessage("🔄 Fetching data...");

    try {
      const startAfter = await fetchStartAfter("accountsPosts");
      const startAfterSnapshot = await getDoc(
        doc(db, DataStorage.accounts, startAfter)
      );
      const availableCredits = await fetchAvailableCredits();
      updateMessage(
        `fetching ${availableCredits} records starting at ${startAfter}`
      );

      const q = query(
        collection(db, DataStorage.accounts),
        limit(availableCredits),
        startAt(startAfterSnapshot)
      );

      const res = await getDocs(q);
      const records = res.docs;
      let totalRecords = records.length;
      if (totalRecords < availableCredits) {
        const q = query(
          collection(db, DataStorage.accounts),
          limit(availableCredits - totalRecords)
        );
        const res = await getDocs(q);
        const records2 = res.docs;
        records.push(...records2);
        totalRecords = records.length;
      }

      updateMessage("🔄 Updating account posts...");

      updateMessage(`totalRecords = ${totalRecords}`);

      const recordPromises = records.map(async (record, i) => {
        if (forceStopRef.current) return;
        try {
          const { secUid, id, topPosts } = record.data();
          updateMessage(
            `🔄 Fetching posts for account ${i + 1} of ${totalRecords}`
          );
          const response = await fetch(
            `${siteConfig.url}/api/scrape/posts/${secUid}`
          );
          const postsArray = await response.json();

          topPosts.forEach((post: any) => {
            if (!postsArray.includes(post)) {
              deleteOldPost(post);
            }
          });

          updateMessage(`🔄 Updating top 5 posts for account ${i + 1}`);
          await updateDoc(doc(db, DataStorage.accounts, id), {
            topPosts: postsArray,
          });
        } catch (error: any) {
          updateMessage(
            `❌ Error updating posts for record ${i + 1}: ${error.message}`
          );
        } finally {
          setProgress(
            (prevProgress) => prevProgress + (1 / totalRecords) * 100
          );
          updateMessage(`✅ Finished processing record ${i + 1}`);
        }
      });

      await Promise.all(recordPromises);
      updateMessage("✅ All records processed successfully");
      return records[records.length - 1].id;
    } catch (error: any) {
      updateMessage(`❌ Error fetching data: ${error.message}`);
      return "";
    }
  };

  //=========> Main update function <=========================
  const Update = async () => {
    setUpdating(true);
    let startAfter = "";
    try {
      if (selectedUpdateType.value === "accountsPosts") {
        startAfter = await UpdateAccountPosts();
      } else if (selectedUpdateType.value === "accountInfo") {
        startAfter = await UpdateAccountInfo();
      } else if (selectedUpdateType.value === "accountsStats") {
        await UpdateAccountStats();
      }
    } catch (error) {
      updateMessage(`🚫 Failed to update`);
      updateMessage(`Error ==> ${error}`);
    }

    await addDoc(collection(db, DataStorage.updateLogs), {
      data: selectedUpdateType.value,
      time: new Date(),
      startAfter: startAfter,
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

  const [availableCredits, setAvailableCredits] = useState<number>(0);

  useEffect(() => {
    async function getTotalCredits() {
      const credits = await fetchAvailableCredits();
      setAvailableCredits(credits);
    }
    getTotalCredits();
  }, []);

  return (
    <>
      <div className="flex items-center gap-4 justify-end w-fit  text-primary/70 fixed right-4 top-4 z-[60] ">
        credits available: {availableCredits}
        <Icons.refresh className="h-5 w-5 text-primary" />
        <span className="text-base ">{"Last updated " + lastUpdate}</span>
      </div>

      <div className=" h-fit p-4 gap-3 items-center border w-full rounded-md   z-40 flex flex-row">
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

const addNewAccountToDb = async (account: AccountStatsResponse) => {
  const dataCollectionTime = new Date().getTime();

  // const docRef = doc(db, "tiktokAccounts", account.user.id);
  const docRef = doc(db, DataStorage.accounts, account.user.id);

  const avatar = await downloadImageAndUploadToFirebase(
    "tiktok-avatars",
    account.user.avatarLarger,
    account.user.id
  );

  const data = {
    avatar,
    id: account.user.id,
    secUid: account.user.secUid,
    uniqueId: account.user.uniqueId,
    storeUrl: "",
    product: "",
    accountStats: [
      {
        dataCollectionTime,
        ...account.stats,
      },
    ],
  };
  await setDoc(docRef, data);
};

const deleteOldPost = async (id: string) => {
  const docRef = doc(collection(db, DataStorage.posts), id);
  await deleteDoc(docRef);

  const storage = getStorage();
  try {
    const videoStorageRef = ref(storage, `${DataStorage.postsMedia}/${id}.mp4`);
    await deleteObject(videoStorageRef);
  } catch (e) {
    console.log(e);
  }
  try {
    const coverStorageRef = ref(storage, `${DataStorage.postsMedia}/${id}.jpg`);
    await deleteObject(coverStorageRef);
  } catch (e) {
    console.log(e);
  }
};

export async function downloadImageAndUploadToFirebase(
  storagePath: string,
  imageUrl: string,
  imageName: string
) {
  const storage = getStorage();
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  const storageRef = ref(storage, `${storagePath}/${imageName}`);

  // Create a upload task
  const uploadTask = uploadBytesResumable(storageRef, buffer, {
    contentType: "image/jpeg", // Manually set the MIME type
  });

  // Create a promise to handle the upload task
  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // You may want to use these to provide feedback to the user
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed", error);
        reject(error);
      },
      async () => {
        // Handle successful uploads on complete
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadUrl);
      }
    );
  });
}

const fetchAvailableCredits = async () => {
  const res = await fetch(`${siteConfig.url}/api/scrape/tiktok-api`);
  const data = await res.json();
  return data as number;
};

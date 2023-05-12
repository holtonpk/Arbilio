import type { NextApiRequest, NextApiResponse } from "next";
import { CollectionType } from "@/types";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const collectionId = req.query.collectionId as string;
  const collection = await getAccountCollectionById(collectionId);

  // Define the batch size
  const batchSize = 5;

  // Create an array to hold the account data
  let data: any = [];

  // Create batches and process each batch
  for (let i = 0; i < collection.ids.length; i += batchSize) {
    const currentBatch = collection.ids.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(
      currentBatch.map((id: any) => getAccountDataById(id))
    );

    // Filter out the fulfilled results and add them to the data array
    const fulfilledResults = batchResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    data = [...data, ...fulfilledResults];
  }

  res
    .status(200)
    .json({ collection: { id: collectionId, ...collection }, data: data });
}

export const db = getFirestore(app);

const getAccountCollectionById = async (
  id: string
): Promise<CollectionType | any> => {
  try {
    const ref = doc(db, `accountCollections/${id}`);
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      console.log("No such document!");
      return { error: "No such document!" };
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return { error: error };
  }
};

const getAccountDataById = async (id: string) => {
  const accountData = await fetch(`http://localhost:3000/api/account/${id}`);
  return accountData.json();
};

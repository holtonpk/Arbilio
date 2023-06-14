import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/context/user-auth";
import {
  doc,
  collection,
  getDocs,
  query,
  limit,
  getDoc,
  where,
} from "firebase/firestore";
import { AccountDataType } from "@/types";
import { storage } from "@/config/data-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountDataType[]>
) {
  const DEMO_COLLECTION_ID = "XYWMcHjIVKnu2O5r6ayG";

  // const docRef = doc(db, storage.accountCollections, DEMO_COLLECTION_ID);
  // const docSnap = await getDoc(docRef);
  // const defaultCollectionData = docSnap.data();
  // const { ids } = defaultCollectionData!;

  const ids = [
    "7208887380605699077",
    "7211952463829795882",
    "7167278845606462465",
    "7206197740939756590",
    "7193873245492495403",
    "7159018787746989061",
    "7208194845553230894",
    "7202095839735481346",
    "6906707354617824262",
    "7215676668573107246",
    "7206799730068046891",
    "7212628824755356677",
    "7206367125144192043",
    "7198322028196660267",
    "6823815737456657413",
    "6969378885050369030",
  ];
  // res.status(200).json(ids);

  const q = query(collection(db, storage.accounts), where("id", "in", ids));
  const docs = await getDocs(q);

  const formattedData = docs.docs.map(async (_doc) => {
    const record = _doc.data();

    return {
      accountStats: record.accountStats,
      followerCount: record.accountStats[0]?.followerCount,
      likeCount: record.accountStats[0]?.heartCount,
      postCount: record.accountStats[0]?.videoCount,
      daysTracked: record.accountStats.length,
      nickname: record.userInfo?.user?.nickname,
      // mostViews: (topPostsData && topPostsData[0].postData.playCount) || 0,
      mostViews: 0,
      avatar: record.avatar,
      id: record.id,
      product: record.product,
      secUid: record.secUid,
      storeUrl: record.storeUrl,
      topPosts: record.topPosts.filter((post: any) => post !== null),
      uniqueId: record.uniqueId,
      userInfo: record.userInfo,
    };
  });

  const data = (await Promise.all(formattedData)) as AccountDataType[];

  res.status(200).json(data);
}

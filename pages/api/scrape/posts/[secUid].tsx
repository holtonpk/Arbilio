import type { NextApiRequest, NextApiResponse } from "next";
import TikAPI from "tikapi";
import { db } from "@/context/Auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  doc,
  collection,
  getDocs,
  query,
  setDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { storage } from "@/config/data-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { secUid }: any = req.query;
  const api = TikAPI(process.env.NEXT_PUBLIC_TIKTOK_API_KEY);
  let response = await api.public.posts({
    secUid: secUid,
  });

  const posts = response.json.itemList;

  const top5Posts: any = posts
    .sort((a: any, b: any) => b.stats.playCount - a.stats.playCount)
    .slice(0, 5);

  // Create a set of post ids
  const postIds = new Set(top5Posts.map((post: any) => post.id));

  // Query all existing posts in one go

  const postExists = await getDocs(
    query(
      collection(db, storage.posts),
      where("postId", "in", Array.from(postIds))
    )
  );

  // Convert the results into a Map for easy lookup
  const existingPosts = new Map(
    postExists.docs.map((doc) => [doc.data().postId, doc.id])
  );

  // Now create or get post id
  const top5PostsIDsPromises = top5Posts.map(async (post: any) => {
    const existingPostId = existingPosts.get(post.id);
    if (existingPostId) {
      updateDoc(doc(db, storage.posts, existingPostId), {
        postData: post.stats,
      });
    } else {
      // add post to db
      const image = await downloadImageAndUploadToFirebase(
        storage.postsMedia,
        post.video.cover,
        post.id
      );
      const video = await saveVideoAndUploadToFirebase(
        storage.postsMedia,
        post.id,
        post.video.downloadAddr,
        response.json.$other.videoLinkHeaders
      );

      // save video to firebase function here

      const docRef = doc(db, storage.posts, post.id);
      await setDoc(docRef, {
        postId: post.id,
        postData: post.stats,
        cover: image,
        video: video,
        createTime: post.createTime,
        desc: post.desc,
        music: post.music,
      });
    }
    return post.id;
  });

  const postsArray = (await Promise.all(top5PostsIDsPromises)) as string[];

  res.status(200).json(postsArray);
}

// const saveVideoAndUploadToFirebase = async (url: string, name: string) => {

// }

export async function saveVideoAndUploadToFirebase(
  storagePath: string,
  videoName: string,
  downloadUrl: string,
  downloadHeaders: any
) {
  const storage = getStorage();
  const response = await fetch(downloadUrl, {
    headers: {
      Cookie: downloadHeaders.Cookie,
      Origin: downloadHeaders.Origin,
      Referer: downloadHeaders.Referer,
    },
  });

  const buffer = await response.arrayBuffer();

  const storageRef = ref(storage, `${storagePath}/${videoName}.mp4`);

  // Create a upload task
  const uploadTask = uploadBytesResumable(storageRef, buffer, {
    contentType: "video/mp4", // Manually set the MIME type
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

export async function downloadImageAndUploadToFirebase(
  storagePath: string,
  imageUrl: string,
  imageName: string
) {
  const storage = getStorage();
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  const storageRef = ref(storage, `${storagePath}/${imageName}.jpg`);

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

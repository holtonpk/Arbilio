// import type { NextApiRequest, NextApiResponse } from "next";
// import PocketBase from "pocketbase";
// import { db } from "@/context/Auth";
// import { app } from "@/firebase";
// import {
//   doc,
//   setDoc,
//   collection,
//   getDocs,
//   query,
//   deleteField,
// } from "firebase/firestore";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>
// ) {
//   const storage = getStorage(app);

//   const q = query(collection(db, "tiktokProducts"));

//   const getImageUrl = async (fileRef: any) => {
//     const imgUrl = await getDownloadURL(fileRef);
//     return imgUrl;
//   };

//   const querySnapshot = await getDocs(q);
//   const dataPromises = querySnapshot.docs.map(async (_doc) => {
//     if (!_doc.data().images[0]) return;
//     const imgFileRef = ref(storage, `products/${_doc.data().images[0]}`);
//     const imgUrl = await getImageUrl(imgFileRef);
//     await setDoc(
//       doc(db, "tiktokProducts", _doc.id),
//       {
//         image: imgUrl,
//         images: deleteField(),
//       },
//       { merge: true }
//     );
//     return { id: _doc.id, img: imgUrl };
//   });

//   const data = await Promise.all(dataPromises);
//   // const data = await copyData();

//   res.status(200).json({ data: data });
// }

// // move data from pocketbase to firebase

// const copyData = async () => {
//   const pb = new PocketBase("http://127.0.0.1:8090");

//   const getData = async () => {
//     const records = await pb.collection("accounts").getFullList();
//     return records;
//   };

//   const data = await getData();

//   // Use Promise.all() and map() instead of forEach()
//   await Promise.all(
//     data.map(async (firebaseData) => {
//       const userCollectionsRef = doc(db, `tiktokAccounts/${firebaseData.id}`);
//       await setDoc(userCollectionsRef, {
//         ...firebaseData,
//       });
//     })
//   );

//   return "Done!";
// };
// // move images from pocketbase to firebase
// // const storage = getStorage(app);

// //   // Replace this with your actual collection IDs or names

// //   const collectionId = "bum948pkcwleyzc";
// //   const records = await pb.collection("products").getFullList(); // Get all records of the collection

// //   for (let record of records) {
// //     const imageUrl = `http://127.0.0.1:8090/api/files/${collectionId}/${record.id}/${record.images[0]}`; // Replace 'avatar' with your actual image field name

// //     // Fetch the image
// //     const response = await fetch(imageUrl);
// //     const buffer = await response.arrayBuffer();

// //     // Create a storage reference
// //     const storageRef = ref(storage, `products/${record.images[0]}`);

// //     // Create a upload task
// //     const uploadTask = uploadBytesResumable(storageRef, buffer, {
// //       contentType: "image/jpeg", // Manually set the MIME type
// //     });

// //     // Register event listeners for when the upload is complete
// //     uploadTask.on(
// //       "state_changed",
// //       (snapshot) => {
// //         // Observe state change events such as progress, pause, and resume
// //       },
// //       (error) => {
// //         // Handle unsuccessful uploads
// //         console.error("Upload failed", error);
// //       },
// //       async () => {
// //         // Handle successful uploads on complete
// //         const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

// //         console.log(`Uploaded ${imageUrl} to ${downloadUrl}`);
// //       }
// //     );
// //   }

import React from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getFirestore,
  updateDoc,
  deleteDoc,
  query,
  getDocs,
  where,
  arrayUnion,
  arrayRemove,
  QuerySnapshot,
} from "firebase/firestore";
import { auth, app } from "@/firebase";
import { useAuth } from "@/context/Auth";
import { CollectionType } from "@/types";
export const db = getFirestore(app);

const useCollection = () => {
  const { currentUser } = useAuth()!;

  const getAccountCollectionById = async (
    id: string
  ): Promise<CollectionType | null> => {
    try {
      const ref = doc(db, `accountCollections/${id}`);
      const docSnapshot = await getDoc(ref);
      if (docSnapshot.exists()) {
        return docSnapshot.data() as CollectionType;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  };

  const createCollection = async (collectionName: string, data: any[]) => {
    if (!currentUser) return console.log("No user");
    try {
      // Get a reference to the 'collections' collection
      const collectionsRef = collection(db, "accountCollections");

      // Add a new document with the specified data to the 'collections' collection
      const docRef = await addDoc(collectionsRef, {
        name: collectionName,
        ids: data,
      });

      // Get a reference to the user's collections
      const userCollectionsRef = doc(
        db,
        `users/${currentUser.uid}/accountCollections/${docRef.id}`
      );

      // Add the reference to the newly created collection to the user's collections
      await setDoc(userCollectionsRef, {
        id: docRef.id,
        ref: docRef,
      });

      return { success: "success", docId: docRef.id };
    } catch (error) {
      return { error: error };
    }
  };

  const fetchCollections = async () => {
    if (!currentUser) return console.log("No user");
    try {
      const userCollectionsRef = collection(
        db,
        `users/${currentUser.uid}/accountCollections`
      );
      const q = query(userCollectionsRef);
      const querySnapshot = await getDocs(q);
      const collections: any[] = [];
      querySnapshot.forEach((doc) => {
        collections.push(doc.data());
      });
      return collections;
    } catch (error) {
      return { error: error };
    }
  };

  const deleteCollection = async (docId: string) => {
    if (!currentUser) return console.log("No user");
    try {
      const docRef = doc(db, `accountCollections/${docId}`);
      await deleteDoc(docRef);

      const userCollectionsRef = doc(
        db,
        `users/${currentUser.uid}/accountCollections/${docId}`
      );
      await deleteDoc(userCollectionsRef);

      return { success: "success" };
    } catch (error) {
      return { error: error };
    }
  };

  const addIdToMultipleCollections = async (
    collectionIds: string[],
    newId: string
  ) => {
    if (!currentUser) return console.log("No user");

    try {
      const promises = collectionIds.map(async (collectionId) => {
        // Get a reference to the main collection document
        const collectionRef = doc(db, "accountCollections", collectionId);

        // Fetch the document
        const docSnapshot = await getDoc(collectionRef);

        // If the document exists and the new ID is not in the 'ids' field, update the field
        if (docSnapshot.exists() && !docSnapshot.data().ids.includes(newId)) {
          await updateDoc(collectionRef, {
            ids: arrayUnion(newId),
          });
        }
      });

      // Wait for all updates to complete
      await Promise.all(promises);

      return { success: "success" };
    } catch (error) {
      return { error: error };
    }
  };

  const removeIdFromMultipleCollections = async (
    collectionIds: string[],
    idToRemove: string
  ) => {
    if (!currentUser) return console.log("No user");

    try {
      const promises = collectionIds.map(async (collectionId) => {
        // Get a reference to the main collection document
        const collectionRef = doc(db, "accountCollections", collectionId);

        // Update the 'ids' field by removing the specified ID
        await updateDoc(collectionRef, {
          ids: arrayRemove(idToRemove),
        });
      });

      // Wait for all updates to complete
      await Promise.all(promises);

      return { success: "success" };
    } catch (error) {
      return { error: error };
    }
  };

  const removeIdFromCollection = async (docId: string, idToRemove: string) => {
    if (!currentUser) return console.log("No user");
    try {
      const docRef = doc(db, `accountCollections/${docId}`);
      await updateDoc(docRef, {
        ids: arrayRemove(idToRemove),
      });
      return { success: "success" };
    } catch (error) {
      return { error: error };
    }
  };

  const updateAccountCollectionName = async (
    docId: string,
    newCollectionName: string
  ) => {
    if (!currentUser) return console.log("No user");
    try {
      const docRef = doc(db, `accountCollections/${docId}`);
      await updateDoc(docRef, {
        name: newCollectionName,
      });
      return { success: "success" };
    } catch (error) {
      return { error: error };
    }
  };

  const findCollectionsContainingId = async (searchId: string) => {
    if (!currentUser) return { error: "No user", data: [] };
    try {
      const userCollectionsRef = collection(
        db,
        `users/${currentUser.uid}/accountCollections`
      );
      const querySnapshot: QuerySnapshot = await getDocs(userCollectionsRef);
      const collectionIds: string[] = [];
      const promises = querySnapshot.docs.map(async (doc) => {
        const accountCollectionRef = doc.get("ref");
        const accountCollectionSnapshot = await getDoc(accountCollectionRef);
        const ids = accountCollectionSnapshot.get("ids") || [];
        if (ids.includes(searchId)) {
          collectionIds.push(doc.id);
        }
      });

      await Promise.all(promises);

      return { data: collectionIds };
    } catch (error) {
      return { error: error, data: [] };
    }
  };

  return {
    getAccountCollectionById,
    findCollectionsContainingId,
    removeIdFromMultipleCollections,
    addIdToMultipleCollections,
    createCollection,
    fetchCollections,
    deleteCollection,
    updateAccountCollectionName,
    removeIdFromCollection,
  };
};

export default useCollection;

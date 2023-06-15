"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import { CollectionType } from "@/types";
import { useAuth } from "@/context/user-auth";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  Timestamp,
  DocumentReference,
  limit,
  setDoc,
  addDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/context/user-auth";
import { storage } from "@/config/data-storage";
import { ProductType, AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";
import { set } from "date-fns";

type ProductDatabaseSearches = {
  timestamps: Timestamp[];
  total: number;
};

interface UserDataContextType {
  trackedProducts: ProductType[] | undefined;
  trackedProductsIds: string[] | undefined;
  productDataBaseSearches: ProductDatabaseSearches | undefined;
  addProductDatabaseSearch: () => Promise<any>;
  fetchTrackedProducts: () => Promise<{ success: string[] } | { error: any }>;
  trackProduct: (id: string) => Promise<{ success: any } | { error: any }>;
  unTrackProduct: (id: string) => Promise<{ success: any } | { error: any }>;
  trackedProductsLoading: boolean;
  setTrackedProductsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userCollections: CollectionType[] | undefined;
  userCollectionsLoading: boolean;
  getAccountCollectionById: (id: string) => Promise<CollectionType | null>;
  createCollection: (
    collectionName: string,
    data: any[]
  ) => Promise<{ success: string; docId: string } | { error: any }>;
  fetchCollections: () => Promise<CollectionType[] | { error: any }>;
  deleteCollection: (
    docId: string
  ) => Promise<{ success: string } | { error: any }>;
  addIdToMultipleCollections: (
    collectionIds: string[],
    newId: string
  ) => Promise<{ success: string } | { error: any }>;
  removeIdFromMultipleCollections: (
    collectionIds: string[],
    idToRemove: string
  ) => Promise<{ success: string } | { error: any }>;
  removeIdFromCollection: (
    collectionId: string,
    id: string
  ) => Promise<{ success: string } | { error: any }>;
  updateAccountCollectionName: (
    id: string,
    name: string
  ) => Promise<{ success: string } | { error: any }>;
  findCollectionsContainingId: (
    searchId: string
  ) => Promise<{ data: string[]; error: any | null }>;
  completeWelcomeIntro: () => Promise<{ success: string } | { error: any }>;
}

const UserDataContext = createContext<UserDataContextType | null>(null);
export const useUserData = () => {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error("useUserData must be used within a collection Provider");
  }

  return context;
};

export const UserDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentUser } = useAuth()!;

  const [trackedProductsIds, setTrackedProductsIds] = useState<string[]>();
  const [trackedProducts, setTrackedProducts] = useState<ProductType[]>();
  const [productDataBaseSearches, setProductDataBaseSearches] =
    useState<ProductDatabaseSearches>();
  const [trackedProductsLoading, setTrackedProductsLoading] =
    useState<boolean>(true);

  const [userCollections, setUserCollections] = useState<CollectionType[]>([]);
  const [userCollectionsLoading, setUserCollectionsLoading] =
    useState<boolean>(true);

  const PRODUCT_TRACK_CREDITS =
    currentUser?.userPlan?.PRODUCT_TRACK_LIMIT.totalCredits || 0;

  const COLLECTION_LIMIT_CREDITS =
    currentUser?.userPlan?.COLLECTION_LIMIT.totalCredits || 0;

  useEffect(() => {
    if (!currentUser) {
      setTrackedProductsIds([]);
      return;
    }
    const userRef = doc(db, `${storage.users}/${currentUser.uid}`);
    const unsubscribe = onSnapshot(userRef, (userSnapshot) => {
      const userData = userSnapshot.data();
      const trackedProducts = userData?.trackedProducts || [];
      setTrackedProductsIds(trackedProducts);

      const productDataBaseSearches = userData?.product_database_searches || [];

      const searches = availableProductDatabaseSearch(
        productDataBaseSearches.timestamps
      );
      console.log("searches", searches);
      setProductDataBaseSearches(searches);
    });

    // Clean up the listener when unmounting
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!trackedProductsIds) return;
    setTrackedProductsLoading(true);
    const fetchProductData = async () => {
      const q = query(
        collection(db, `${storage.products}`),
        where("id", "in", trackedProductsIds)
      );
      const record = await getDocs(q);
      const products = record.docs.map(async (doc) => {
        const accountDataRes = await fetch(
          `${siteConfig.url}/api/get-product-accounts/${doc.id}`
        );
        const accountData: AccountDataType[] = await accountDataRes.json();
        return {
          ...doc.data(),
          accountsData: accountData,
        };
      });
      const productsData = (await Promise.all(products)) as ProductType[];

      setTrackedProducts(productsData);
      setTrackedProductsLoading(false);
    };

    setTrackedProductsLoading(true);
    if (trackedProductsIds.length === 0) {
      setTrackedProducts([]);
      setTrackedProductsLoading(false);
      return;
    } else {
      console.log("fetching", trackedProductsIds);
      fetchProductData();
    }
  }, [trackedProductsIds]);

  const fetchTrackedProducts = async (): Promise<
    { success: string[] } | { error: any }
  > => {
    if (!currentUser) return { error: "no user" };

    const userRef = doc(db, `${storage.users}/${currentUser.uid}`);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    if (!userData) return { error: "no user data" };
    const { trackedProducts } = userData;

    return { success: trackedProducts || [] };
  };

  const unTrackProduct = async (
    id: string
  ): Promise<{ success: any } | { error: any }> => {
    if (!currentUser) return { error: "no user" };
    const userRef = doc(db, `${storage.users}/${currentUser.uid}`);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    if (!userData) return { error: "no user data" };
    const { trackedProducts } = userData;
    if (!trackedProducts) return { error: "no product track" };
    const newProductTrack = trackedProducts.filter(
      (productId: string) => productId !== id
    );
    await updateDoc(userRef, { trackedProducts: newProductTrack });
    return { success: "updated" };
  };

  const trackProduct = async (
    id: string
  ): Promise<{ success: any } | { error: any }> => {
    if (!currentUser) return { error: "no user" };

    if (
      trackedProductsIds &&
      trackedProductsIds?.length + 1 > PRODUCT_TRACK_CREDITS
    )
      return { error: "no-credits" };

    const userRef = doc(db, `${storage.users}/${currentUser.uid}`);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    if (!userData) return { error: "no user data" };
    const { trackedProducts } = userData;
    if (!trackedProducts) {
      await updateDoc(userRef, { trackedProducts: [id] });
      return { success: "updated" };
    } else {
      const newProductTrack = [...trackedProducts, id];
      await updateDoc(userRef, { trackedProducts: newProductTrack });

      return { success: "updated" };
    }
  };

  const addProductDatabaseSearch = async (): Promise<any> => {
    if (!currentUser) return { error: "no user" };
    const userRef = doc(db, `${storage.users}/${currentUser.uid}`);
    const timestampList = productDataBaseSearches?.timestamps || [];
    await updateDoc(userRef, {
      product_database_searches: {
        timestamps: [...timestampList, new Date()],
        total: productDataBaseSearches ? productDataBaseSearches.total + 1 : 1,
      },
    });
  };

  const availableProductDatabaseSearch = (
    oldTimestamps: Timestamp[]
  ): ProductDatabaseSearches => {
    if (!oldTimestamps) return { timestamps: [], total: 0 };
    // if the timestamps are more than 24 hours old, remove the timestamp from the list
    console.log("oldTimestamps", oldTimestamps);
    const timestamps = oldTimestamps.filter((timestamp: Timestamp) => {
      const timestampDate = timestamp.toDate();
      const now = new Date();
      const diff = now.getTime() - timestampDate.getTime();
      const hours = Math.floor(diff / (10 * 60 * 60));
      console.log("hours", hours);
      if (hours > 2400) return false;
      return true;
    });

    return {
      timestamps,
      total: timestamps.length,
    };
  };

  // Account Collections =========================================================

  useEffect(() => {
    const collectionUnsubscribes: (() => void)[] = [];

    const fetchCollectionData = (docRef: DocumentReference, docId: string) => {
      return new Promise<void>((resolve) => {
        const unsubscribe = onSnapshot(docRef, async (docSnapshot) => {
          if (docSnapshot.exists()) {
            const { ids } = docSnapshot.data();
            let first3: any = undefined;
            if (ids.length > 0) {
              const q = query(
                collection(db, storage.accounts),
                limit(3),
                where("id", "in", ids)
              );
              first3 = await getDocs(q);
            }
            const collectionData = {
              id: docSnapshot.id,
              ...docSnapshot.data(),
              first3Items: first3
                ? first3.docs.map((doc) => {
                    const data = doc.data();
                    return {
                      id: doc.id,
                      avatar: data.avatar,
                    };
                  })
                : undefined,
            } as CollectionType;

            setUserCollections((prevCollections) => {
              const newCollections = [...prevCollections];
              const index = newCollections.findIndex(
                (coll) => coll.id === docSnapshot.id
              );
              if (index > -1) {
                newCollections[index] = collectionData;
              } else {
                newCollections.push(collectionData);
              }
              return newCollections;
            });
          } else {
            setUserCollections((prevCollections) =>
              prevCollections.filter((coll) => coll.id !== docId)
            );
          }
          resolve();
        });
        collectionUnsubscribes.push(unsubscribe);
      });
    };

    if (currentUser) {
      const userCollectionsRef = collection(
        db,
        `${storage.users}/${currentUser.uid}/${storage.userAccountCollections}`
      );
      console.log(
        "userCollectionsRef",
        `${storage.users}/${currentUser.uid}/${storage.userAccountCollections}`
      );
      const unsubscribeUserCollections = onSnapshot(
        userCollectionsRef,
        async (snapshot) => {
          // Unsubscribe from previous document listeners
          collectionUnsubscribes.forEach((unsubscribe) => unsubscribe());
          collectionUnsubscribes.length = 0;

          // Fetch the referenced collections
          const fetchPromises = snapshot.docs.map((userCollectionDoc) => {
            const refData = userCollectionDoc.data();
            if (refData && refData.ref) {
              return fetchCollectionData(refData.ref, userCollectionDoc.id);
            }
            return Promise.resolve();
          });

          await Promise.all(fetchPromises);

          // Handle deletions
          const currentUserCollectionIds = snapshot.docs.map((doc) => doc.id);
          setUserCollections((prevCollections) =>
            prevCollections.filter((coll) =>
              currentUserCollectionIds.includes(coll.id)
            )
          );

          setUserCollectionsLoading(false);
        }
      );

      return () => {
        collectionUnsubscribes.forEach((unsubscribe) => unsubscribe());
        unsubscribeUserCollections();
      };
    } else {
      setUserCollections([]);
      setUserCollectionsLoading(false);
    }
  }, [currentUser]);

  const getAccountCollectionById = async (
    id: string
  ): Promise<CollectionType | null> => {
    try {
      const ref = doc(db, `${storage.accountCollections}/${id}`);
      const docSnapshot = await getDoc(ref);
      if (docSnapshot.exists()) {
        return docSnapshot.data() as CollectionType;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const createCollection = async (
    collectionName: string,
    data: any[]
  ): Promise<{ success: string; docId: string } | { error: any }> => {
    if (!currentUser) return { error: "no user" };

    if (userCollections.length + 1 > COLLECTION_LIMIT_CREDITS)
      return { error: "no-credits" };

    try {
      // Get a reference to the 'collections' collection
      const collectionsRef = collection(db, storage.accountCollections);

      // Add a new document with the specified data to the 'collections' collection
      const docRef = await addDoc(collectionsRef, {
        name: collectionName,
        ids: data,
      });

      // Get a reference to the user's collections
      const userCollectionsRef = doc(
        db,
        `${storage.users}/${currentUser.uid}/${storage.userAccountCollections}/${docRef.id}`
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

  const fetchCollections = async (): Promise<
    CollectionType[] | { error: any }
  > => {
    if (!currentUser) return { error: "no user" };
    try {
      const userCollectionsRef = collection(
        db,
        `${storage.users}/${currentUser.uid}/${storage.userAccountCollections}`
      );
      const q = query(userCollectionsRef);
      const querySnapshot = await getDocs(q);
      const collections: CollectionType[] = [];
      querySnapshot.forEach((doc) => {
        collections.push(doc.data() as CollectionType);
      });
      return collections;
    } catch (error) {
      return { error: error };
    }
  };

  const deleteCollection = async (
    docId: string
  ): Promise<{ success: string } | { error: any }> => {
    if (!currentUser) return { error: "no user" };
    try {
      const docRef = doc(db, `${storage.accountCollections}/${docId}`);
      await deleteDoc(docRef);

      const userCollectionsRef = doc(
        db,
        `${storage.users}/${currentUser.uid}/${storage.userAccountCollections}/${docId}`
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
  ): Promise<{ success: string } | { error: any }> => {
    if (!currentUser) return { error: "no user" };

    try {
      const promises = collectionIds.map(async (collectionId) => {
        // Get a reference to the main collection document
        const collectionRef = doc(db, storage.accountCollections, collectionId);

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
  ): Promise<{ success: string } | { error: any }> => {
    if (!currentUser) return { error: "no user" };

    try {
      const promises = collectionIds.map(async (collectionId) => {
        // Get a reference to the main collection document
        const collectionRef = doc(db, storage.accountCollections, collectionId);

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

  const removeIdFromCollection = async (
    docId: string,
    idToRemove: string
  ): Promise<{ success: string } | { error: any }> => {
    if (!currentUser) return { error: "no user" };
    try {
      const docRef = doc(db, `${storage.accountCollections}/${docId}`);
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
  ): Promise<{ success: string } | { error: any }> => {
    if (!currentUser) return { error: "no user" };
    try {
      const docRef = doc(db, `${storage.accountCollections}/${docId}`);
      await updateDoc(docRef, {
        name: newCollectionName,
      });
      return { success: "success" };
    } catch (error) {
      return { error: error };
    }
  };

  const findCollectionsContainingId = async (
    searchId: string
  ): Promise<{ data: string[]; error: any | null }> => {
    if (!currentUser) return { error: "No user", data: [] };
    try {
      const userCollectionsRef = collection(
        db,
        `${storage.users}/${currentUser.uid}/${storage.userAccountCollections}`
      );
      const querySnapshot: QuerySnapshot = await getDocs(userCollectionsRef);
      const promises = querySnapshot.docs.map(async (doc) => {
        const accountCollectionRef = doc.get("ref");
        try {
          const docs = await getDoc(accountCollectionRef);
          const record = docs.data() as DocumentData;
          if (record.ids.includes(searchId)) {
            return doc.id;
          }
          return []; // Return an empty array instead of null
        } catch (error) {
          return [];
        }
      });

      const results = await Promise.all(promises);
      const data = results.flat();
      return { data, error: null }; // Consistent return type
    } catch (error) {
      return { data: [], error };
    }
  };

  const completeWelcomeIntro = async (): Promise<
    { success: string } | { error: any }
  > => {
    if (!currentUser) return { error: "no user" };
    try {
      const docRef = doc(db, `${storage.users}/${currentUser.uid}`);
      await updateDoc(docRef, {
        welcome_intro: true,
      });
      return { success: "success" };
    } catch (error) {
      return { error: error };
    }
  };

  const values = {
    trackedProducts,
    trackedProductsIds,
    productDataBaseSearches,
    addProductDatabaseSearch,
    fetchTrackedProducts,
    trackProduct,
    unTrackProduct,
    trackedProductsLoading,
    setTrackedProductsLoading,
    userCollections,
    userCollectionsLoading,
    getAccountCollectionById,
    createCollection,
    fetchCollections,
    deleteCollection,
    addIdToMultipleCollections,
    removeIdFromMultipleCollections,
    removeIdFromCollection,
    updateAccountCollectionName,
    findCollectionsContainingId,
    completeWelcomeIntro,
  };

  return (
    <UserDataContext.Provider value={values}>
      {children}
    </UserDataContext.Provider>
  );
};

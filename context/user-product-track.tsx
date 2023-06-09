"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import { CollectionType } from "@/types";
import { useAuth } from "@/context/Auth";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/context/Auth";
import { storage } from "@/config/data-storage";
import { ProductType, AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";
import { set } from "date-fns";
interface ProductTrackContextType {
  trackedProducts: ProductType[] | undefined;
  trackedProductsIds: string[] | undefined;
  fetchTrackedProducts: () => Promise<{ success: string[] } | { error: any }>;
  trackProduct: (id: string) => Promise<{ success: any } | { error: any }>;
  unTrackProduct: (id: string) => Promise<{ success: any } | { error: any }>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserProductTrackContext = createContext<ProductTrackContextType | null>(
  null
);
export const useUserProductTrack = () => {
  const context = useContext(UserProductTrackContext);

  if (!context) {
    throw new Error(
      "useUserCollections must be used within a collection Provider"
    );
  }

  return context;
};

interface ProductTrackProps {
  children: React.ReactNode;
}

export const UserProductTrackProvider = ({ children }: ProductTrackProps) => {
  const { currentUser } = useAuth()!;

  const [trackedProductsIds, setTrackedProductsIds] = useState<string[]>();
  const [trackedProducts, setTrackedProducts] = useState<ProductType[]>();
  const [loading, setLoading] = useState<boolean>(true);

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
    });

    // Clean up the listener when unmounting
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!trackedProductsIds) return;
    setLoading(true);
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
      setLoading(false);
    };

    setLoading(true);
    if (trackedProductsIds.length === 0) {
      setTrackedProducts([]);
      setLoading(false);
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

  const values = {
    trackedProducts,
    trackedProductsIds,
    fetchTrackedProducts,
    trackProduct,
    unTrackProduct,
    loading,
    setLoading,
  };

  return (
    <UserProductTrackContext.Provider value={values}>
      {children}
    </UserProductTrackContext.Provider>
  );
};

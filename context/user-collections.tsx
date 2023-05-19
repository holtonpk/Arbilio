"use client";
import React, { useContext, createContext, useState, useEffect } from "react";

import { CollectionType } from "@/types";
import { useAuth } from "@/context/Auth";
import useCollection, { db } from "@/hooks/use-collection";
import { collection, onSnapshot, DocumentReference } from "firebase/firestore";

interface CollectionContextType {
  userCollections: CollectionType[] | undefined;
  loading: boolean;
}

const UserCollectionContext = createContext<CollectionContextType | null>(null);
export const useUserCollections = () => {
  const context = useContext(UserCollectionContext);

  if (!context) {
    throw new Error(
      "useUserCollections must be used within a collection Provider"
    );
  }

  return context;
};

interface CollectionProviderProps {
  children: React.ReactNode;
}

export const UserCollectionProvider = ({
  children,
}: CollectionProviderProps) => {
  const { currentUser } = useAuth()!;
  const [userCollections, setUserCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const collectionUnsubscribes: (() => void)[] = [];

    const fetchCollectionData = (docRef: DocumentReference, docId: string) => {
      return new Promise<void>((resolve) => {
        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const collectionData = {
              id: docSnapshot.id,
              ...docSnapshot.data(),
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
        `users/${currentUser.uid}/accountCollections`
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

          setLoading(false);
        }
      );

      return () => {
        collectionUnsubscribes.forEach((unsubscribe) => unsubscribe());
        unsubscribeUserCollections();
      };
    } else {
      setUserCollections([]);
      setLoading(false);
    }
  }, [currentUser]);

  const values = {
    userCollections,
    loading,
  };

  return (
    <UserCollectionContext.Provider value={values}>
      {children}
    </UserCollectionContext.Provider>
  );
};

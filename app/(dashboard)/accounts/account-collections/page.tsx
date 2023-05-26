"use client";
import React from "react";
import { PageHeader } from "@/components/header";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import CreateCollectionButton from "@/components/buttons/create-collection-button";
import { useUserCollections } from "@/context/user-collections";
import CollectionDisplay from "@/components/collection-display";
const AccountCollections = () => {
  const { userCollections, loading } = useUserCollections();

  return (
    <>
      <PageHeader
        heading="Account Collections"
        text={
          "Leverage the power of collections to organize your accounts and products."
        }
      >
        <CreateCollectionButton variant="default" />
      </PageHeader>
      <div className="w-full border-t bg-muted/60">
        <div className="w-full md:container  pt-6  flex flex-col min-h-screen items-center  ">
          {userCollections && userCollections?.length > 0 ? (
            <div className="divide-y divide-border rounded-md border w-full bg-background">
              {userCollections.map((collection: any, i: number) => (
                <CollectionDisplay key={i} collection={collection} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder className="w-[90%] mt-4 mx-auto">
              <EmptyPlaceholder.Icon name="collection" />
              <EmptyPlaceholder.Title>
                No collections created
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any collections yet.
              </EmptyPlaceholder.Description>
              <CreateCollectionButton variant="outline" />
            </EmptyPlaceholder>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountCollections;

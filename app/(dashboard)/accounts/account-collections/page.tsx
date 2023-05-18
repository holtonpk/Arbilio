"use client";
import React, { ReactElement, useState } from "react";
import { PageHeader } from "@/components/header";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import Link from "next/link";
import { CollectionOperations } from "@/components/buttons/collection-operations";
import CreateCollectionButton from "@/components/buttons/create-collection-button";
import { useUserCollections } from "@/context/user-collections";
import { CollectionType } from "@/types";
import Loading from "./loading";

const AccountCollections = () => {
  const { userCollections, loading } = useUserCollections();

  console.log("userCollections", userCollections, loading);

  return (
    <>
      {userCollections && !loading ? (
        <>
          <PageHeader
            heading="Account Collections"
            text={
              "Leverage the power of collections to organize your accounts and products."
            }
          >
            <CreateCollectionButton variant="default" />
          </PageHeader>
          {userCollections?.length > 0 ? (
            <div className="divide-y divide-border rounded-md border">
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
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AccountCollections;

interface CollectionDisplayProps {
  collection: CollectionType;
}

const CollectionDisplay = ({ collection }: CollectionDisplayProps) => {
  console.log("collection", collection);
  return (
    // <div className="flex flex-col gap-4 w-full   mt-6">

    <>
      <div className="flex items-center justify-between p-4">
        <div className="grid gap-1">
          <Link
            href={`accounts/account-collections/collection/${collection.id}`}
            className="font-semibold hover:underline"
          >
            {collection.name}
          </Link>
          <div>
            <p className="text-sm text-muted-foreground">
              {/* {formatDate(post.createdAt?.toDateString())} */}
              {`${collection.ids.length} accounts`}
            </p>
          </div>
        </div>
        <CollectionOperations collection={collection} />
      </div>
    </>
  );
};

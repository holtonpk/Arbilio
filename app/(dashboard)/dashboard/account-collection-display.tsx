"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useUserData } from "@/context/user-data";
import CollectionDisplay from "@/app/(dashboard)/accounts/account-collections/collection-display";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { CreateCollectionButton } from "@/components/buttons/create-collection-button";
import Tooltip from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/user-auth";

export const AccountCollectionDisplay = () => {
  const { userCollections } = useUserData();

  const { currentUser } = useAuth()!;

  const trackLimit = currentUser?.userPlan?.COLLECTION_LIMIT;

  console.log("userCollections", userCollections);

  // const COLLECTION_LIMIT = 5;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col  rounded-md relative  h-fit w-full">
        <div className="flex border-t border-x rounded-t-md  w-full h-fit ">
          <div className=" p-4 rounded-md flex w-fit  h-fit items-center gap-4">
            {/* <span className=" aspect-square p-2 h-fit rounded-md bg-muted border border-accent">
              <Icons.accounts className="h-6 w-6 text-muted-foreground" />
            </span> */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <h1 className="font-bold capitalize text-lg text-primary whitespace-nowrap">
                  Accounts Collections
                </h1>
                <Tooltip content="Create account to collections to easily monitor account performance">
                  <div className="flex h-4 w-8 justify-center">
                    <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Tooltip>
              </div>

              {trackLimit &&
                !trackLimit.unlimited &&
                trackLimit.totalCredits > 0 && (
                  <div className="absolute top-3 right-3 text-xl font-bold text-primary flex items-center w-fit ">
                    {userCollections?.length || 0}
                    <h2 className="text-muted-foreground text-sm ">
                      /{trackLimit.totalCredits}
                    </h2>
                  </div>
                )}
            </div>
          </div>
        </div>
        {userCollections && userCollections?.length > 0 ? (
          <ScrollArea className="max-h-[200px] border rounded-b-md ">
            <div className="divide-y divide-border grid rounded-b-md  h-fit w-full bg-background">
              {userCollections.map((collection: any, i: number) => (
                <CollectionDisplay key={i} collection={collection} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="px-6 pb-6 border-x border-b rounded-b-md">
            <EmptyPlaceholder className="w-full h-fit min-h-fit  rounded-md  px-4">
              {/* <EmptyPlaceholder.Icon name="collection" /> */}
              <EmptyPlaceholder.Title className=" mt-0">
                No collections created
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description className="mb-4 w-full">
                Create account to collections to easily monitor account
                performance
              </EmptyPlaceholder.Description>
              <CreateCollectionButton>+ New Collection</CreateCollectionButton>
            </EmptyPlaceholder>
          </div>
        )}
      </div>
      {userCollections &&
        trackLimit &&
        userCollections?.length > 0 &&
        userCollections?.length < trackLimit.totalCredits && (
          <CreateCollectionButton variant="outline" className="mt-2 mx-auto">
            + New Collection
          </CreateCollectionButton>
        )}
    </div>
  );
};

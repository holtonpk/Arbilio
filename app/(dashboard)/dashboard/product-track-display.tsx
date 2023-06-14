"use client";

import React, { useEffect } from "react";
import { Icons } from "@/components/icons";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import Tooltip from "@/components/ui/tooltip";
import { LinkButton } from "@/components/ui/link";
import { useUserData } from "@/context/user-data";
import { RemoveTrackProductButton } from "@/components/buttons/remove-track-product-button";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/user-auth";

export const ProductTrackDisplay = () => {
  const { trackedProducts } = useUserData()!;
  const { currentUser } = useAuth()!;

  const trackLimit = currentUser?.userPlan?.PRODUCT_TRACK_LIMIT;

  // const TRACK_LIMIT = 3;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid  relative  h-fit w-full ">
        <div className="flex justify-between w-full border-t border-x  rounded-t-md">
          <div className=" p-4 rounded-md flex w-fit  h-fit items-center gap-4">
            {/* <span className=" aspect-square p-2 h-fit rounded-md bg-muted border border-accent">
              <Icons.products className="h-6 w-6 text-muted-foreground" />
            </span> */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <h1 className="font-bold capitalize text-lg text-primary whitespace-nowrap">
                  Tracked Products
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
                    {trackedProducts?.length || 0}
                    <h2 className="text-muted-foreground text-sm ">
                      /{trackLimit?.totalCredits}
                    </h2>
                  </div>
                )}
            </div>
          </div>
        </div>
        {trackedProducts && trackedProducts?.length > 0 ? (
          <ScrollArea className="max-h-[300px] border rounded-b-md ">
            <div className="divide-y divide-border w-full bg-background">
              {trackedProducts.map((product: any, i: number) => (
                <div
                  key={i}
                  className="flex gap-4 items-center p-2 cursor-pointer"
                >
                  <div className="flex justify-between w-full">
                    <div className="grid gap-1 grid-cols-[48px_1fr] items-center">
                      <div className="h-12 relative overflow-hidden aspect-square bg-muted rounded-md">
                        <Image
                          src={product.image}
                          layout="fill"
                          objectFit="cover"
                          alt={product.title}
                        />
                      </div>
                      <h1 className="font-semibold">{product.title}</h1>
                    </div>
                  </div>
                  <RemoveTrackProductButton
                    id={product.id}
                    variant={"link"}
                    className="whitespace-nowrap  text-destructive "
                  >
                    remove
                  </RemoveTrackProductButton>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="px-6 pb-6 border-x border-b rounded-b-md">
            <EmptyPlaceholder className="w-full h-fit min-h-fit  rounded-md  px-4">
              {/* <EmptyPlaceholder.Icon name="collection" /> */}
              <EmptyPlaceholder.Title className=" mt-0">
                No products tracked
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description className="mb-4 w-full">
                Track products to monitor their performance and get insights
              </EmptyPlaceholder.Description>
              <LinkButton href={"/products/product-database"}>
                Browse Products
              </LinkButton>
            </EmptyPlaceholder>
          </div>
        )}
      </div>
      {trackedProducts &&
        trackLimit &&
        trackedProducts?.length > 0 &&
        trackedProducts?.length < trackLimit.totalCredits && (
          <LinkButton
            variant="outline"
            href={"/products/product-database"}
            className="w-fit mt-2"
          >
            Browse Products
          </LinkButton>
        )}
    </div>
  );
};

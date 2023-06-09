"use client";
import React from "react";
import ProductTrackerLayout from "./product-tracker-layout";
import { PageHeader } from "@/components/header";
import { AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";
import { ProductType } from "@/types";
import { Query } from "firebase/firestore";
import { useUserProductTrack } from "@/context/user-product-track";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { LinkButton } from "@/components/ui/link";
import Loading from "./loading";
export default function ProductTracker() {
  const { trackedProducts, loading, trackedProductsIds } =
    useUserProductTrack()!;
  console.log("trackedProducts", trackedProducts, trackedProductsIds, loading);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <PageHeader
            heading="Product Tracker"
            text={
              "Track your products and get notified when ae new post or account is found"
            }
          />
          {trackedProducts && trackedProducts.length > 0 ? (
            <ProductTrackerLayout data={trackedProducts} />
          ) : (
            <div className="px-6 pb-6">
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
        </>
      )}
    </>
  );
}

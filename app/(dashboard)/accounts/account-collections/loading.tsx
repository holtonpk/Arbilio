"use client";
import Skeleton from "@/components/ui/skeleton";
import { PageHeader } from "@/components/header";
import { CreateCollectionButton } from "@/components/buttons/create-collection-button";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <PageHeader
        heading="Account Collections"
        text={
          "Leverage the power of collections to organize your accounts and products."
        }
      >
        <CreateCollectionButton variant="default" className="whitespace-nowrap">
          + New Collection
        </CreateCollectionButton>
      </PageHeader>
      <div className="w-full container  pt-6  flex flex-col min-h-screen items-center gap-4  ">
        <div className="divide-y divide-border rounded-md border w-full bg-background">
          <Skeleton className="w-full h-[80px] rounded-none" />
          <Skeleton className="w-full h-[80px] rounded-none" />
          <Skeleton className="w-full h-[80px] rounded-none" />
        </div>
      </div>
    </>
  );
}

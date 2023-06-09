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
      <div className="w-full border-t ">
        <div className="w-full md:container  pt-6  flex flex-col min-h-screen items-center  ">
          <div className="divide-y divide-border rounded-md border w-full bg-background">
            <CollectionLine />
            <CollectionLine />
            <CollectionLine />
          </div>
        </div>
      </div>
    </>
  );
}

const CollectionLine = () => {
  return (
    <div className="flex w-full justify-between items-center p-4">
      <div className="flex w-fit items-center gap-4 ">
        <div className="grid  gap-1 relative z-10 pointer-events-none">
          <Skeleton className="w-[200px] h-[24px]" />
          <Skeleton className="w-24 h-[20px]" />
        </div>
        <div>
          <div className="flex justify-center space-x-[-10px]">
            {Array(4)
              .fill(0)
              .map((item: any, i: number) => (
                <>
                  <Skeleton
                    key={i}
                    className="aspect-square  relative h-10 overflow-hidden rounded-full bg-muted border flex items-center justify-center hover:z-30"
                  />
                </>
              ))}
          </div>
        </div>
      </div>
      <Skeleton className="h-10 w-10" />
    </div>
  );
};

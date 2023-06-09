import Skeleton from "@/components/ui/skeleton";
import { PageHeader } from "@/components/header";
import { AccountCardSkeleton } from "@/components/ui/account-card";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <PageHeader
        heading="Account Database"
        // text={
        //   "Browse our collection of over 500 active sellers and 1000+ accounts."
        // }
      />
      <div className="w-full border-t">
        <div className="w-full md:container pt-4  flex flex-col min-h-screen items-center  ">
          <div className="flex gap-2 w-full">
            <Skeleton className="h-[40px] flex-grow" />
            <Skeleton className="h-[40px] w-[150px]" />
            <div className="flex w-fit gap-2 ">
              <Skeleton className="h-[40px] w-[40px]" />
              <Skeleton className="h-[40px] w-[40px]" />
            </div>
          </div>
          <div className="w-full mt-2  ">
            <div className="grid  lg:grid-cols-4  grid-cols-1 sm:grid-cols-2 gap-8 h-full  ">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <AccountCardSkeleton key={i} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

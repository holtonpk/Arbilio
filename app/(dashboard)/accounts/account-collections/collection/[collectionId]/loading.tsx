import Skeleton from "@/components/ui/skeleton";
import { PageHeader } from "@/components/header";
import { AccountCardSkeleton } from "@/components/ui/account-card";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full md:container   gap-4 flex flex-col min-h-screen items-start  ">
      <div className="flex gap-4 w-full">
        <Skeleton className="h-[40px] w-[50px]" />
        <Skeleton className="h-[40px] w-[30%]" />
      </div>
      <div className="flex gap-2 w-full ">
        <Skeleton className="h-[40px] flex-grow" />
        <div className="flex w-fit gap-2 ">
          <Skeleton className="h-[40px] w-[40px]" />
          <Skeleton className="h-[40px] w-[40px]" />
        </div>
      </div>
      <div className="grid  lg:grid-cols-4  grid-cols-2 gap-8 h-full w-full  ">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <AccountCardSkeleton key={i} />
          ))}
      </div>
    </div>
  );
}

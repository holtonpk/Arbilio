import Skeleton from "@/components/ui/custom-skeleton";
import { PageHeader } from "@/components/header";
import { AccountCardSkeleton } from "@/components/account-card";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full md:container   gap-4 flex flex-col min-h-screen items-start  ">
      <div className="flex gap-4 w-full">
        <Skeleton height={40} width={50} />
        <Skeleton height={40} width={"30%"} />
      </div>
      <div className="flex gap-2 w-full ">
        <Skeleton height={40} width={"20%"} />
        <Skeleton height={40} width={"10%"} />
        <Skeleton height={40} width={"20%"} />
        <div className="flex w-fit gap-2 ">
          <Skeleton height={40} width={40} />
          <Skeleton height={40} width={40} />
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

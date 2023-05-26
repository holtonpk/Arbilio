import Skeleton from "@/components/ui/custom-skeleton";
import { PageHeader } from "@/components/header";
import { AccountCardSkeleton } from "@/components/account-card";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col gap-2">
      <PageHeader
        heading="Account Database"
        // text={
        //   "Browse our collection of over 500 active sellers and 1000+ accounts."
        // }
      />
      <div className="w-full border-t">
        <div className="w-full md:container  pt-6  flex flex-col min-h-screen items-center  ">
          <div className="flex gap-2 w-full">
            <Skeleton height={40} width={"50%"} />
            <Skeleton height={40} width={"10%"} />
            <Skeleton height={40} width={"20%"} />

            <div className="flex w-fit gap-2 ">
              <Skeleton height={40} width={40} />
              <Skeleton height={40} width={40} />
            </div>
          </div>
          <div className="grid  lg:grid-cols-4  grid-cols-2 gap-8 h-full w-full mt-4  ">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <AccountCardSkeleton key={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import Skeleton from "@/components/ui/custom-skeleton";
import { PageHeader } from "@/components/header";

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
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 h-full w-full mt-4  ">
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

export const AccountCardSkeleton = () => {
  return (
    <div className="w-full bg-background border border-border rounded-md h-fit  pb-2 items-center relative flex flex-col">
      <div className="flex items-center gap-2 w-full pb-0 p-4">
        <Skeleton height={40} width={40} />
        <div className="flex flex-col gap-2 ">
          <Skeleton height={15} width={100} />
          <Skeleton height={10} width={100} />
        </div>
      </div>
      <div className=" p-4">
        <Skeleton height={50} width={200} />
      </div>

      <Skeleton height={60} width={"90%"} />

      <div className="flex flex-col mt-auto w-[90%] pt-8">
        <div className="grid grid-cols-3 gap-2 w-full ">
          <Skeleton height={100} width={"100%"} />
          <Skeleton height={100} width={"100%"} />
          <Skeleton height={100} width={"100%"} />
        </div>
      </div>
    </div>
  );
};

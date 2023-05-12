import Skeleton from "@/components/ui/custom-skeleton";

// ViewAccount skeleton
export default function Loading() {
  return (
    <div className=" px-4">
      <div className="w-full rounded-md flex flex-col items-center p-4 pt-0 relative">
        <div className="flex items center gap-4 absolute top-4 right-4">
          <Skeleton width={100} height={40} />
        </div>
        <div className="flex w-full">
          <ProfileDisplaySkeleton />
        </div>

        <ProductDisplaySkeleton />
        <ProductDisplaySkeleton />
        <AnalyticsDisplaySkeleton />
      </div>
    </div>
  );
}
const ProfileDisplaySkeleton = () => {
  return (
    <div className="flex items-center  p-4 gap-4 rounded-md w-full relative">
      <Skeleton height={160} width={160} />
      <div className="flex flex-col w-[60%] gap-2">
        <Skeleton height={40} width={200} />
        <Skeleton height={20} width={100} />
        <div className="grid grid-cols-3 items-center p-4 gap-4 rounded-md w-full justify-between relative">
          <Skeleton height={50} width={"100%"} />
          <Skeleton height={50} width={"100%"} />
          <Skeleton height={50} width={"100%"} />
        </div>
      </div>
    </div>
  );
};

const AnalyticsDisplaySkeleton = () => {
  return (
    <div className="flex flex-col w-full mt-3">
      <Skeleton height={40} width={200} />
      <Skeleton height={20} width={100} />
      <div className="grid gap-8 border rounded-md p-3 ">
        <Skeleton height={250} width={"100%"} />
        <div className="grid grid-cols-2 gap-8 h-fit">
          <Skeleton height={250} width={"100%"} />
          <Skeleton height={250} width={"100%"} />
        </div>
      </div>
    </div>
  );
};

const ProductDisplaySkeleton = () => {
  return (
    <div className="flex flex-col mt-3 w-full gap-2">
      <Skeleton height={40} width={200} />
      <Skeleton height={20} width={400} />
      <div className="flex flex-col divide-y divide-border rounded-md border p-3 mt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Skeleton width={100} height={100} />
            <Skeleton width={200} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

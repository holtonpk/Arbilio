import Skeleton from "@/components/ui/skeleton";

// ViewAccount skeleton
export default function Loading() {
  return (
    <div className="container">
      <div className="w-full rounded-md flex flex-col items-center  pt-0 relative">
        <div className="grid md:grid-cols-2 w-full gap-4">
          <div className="w-full  flex flex-col  gap-4 ">
            <ProfileDisplaySkeleton />
            <ProductDisplaySkeleton />
            <StoreDisplaySkeleton />
            <PostDisplaySkeleton />
          </div>
          <div className="">
            <AnalyticsDisplaySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
const ProfileDisplaySkeleton = () => {
  return (
    <div className="flex items-center flex-col md:grid md:grid-cols-[150px_1fr] gap-4  rounded-md w-full relative">
      <Skeleton className=" relative aspect-square  h-20 md:h-[150px]" />

      <div className="flex flex-col w-full items-center md:items-start gap-2">
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[20px] w-1/2" />
        <div className="flex items center gap-4 mt-3 ">
          <Skeleton className="h-10 w-[200px] aspect-square" />
        </div>
      </div>
    </div>
  );
};

const AnalyticsDisplaySkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full mt-3">
      <Skeleton className="h-[40px] w-[200px]" />
      {/* <Skeleton className="h-[20px] w-[400px]" /> */}
      <Skeleton className="h-[300px] w-[100%]" />
      <Skeleton className="h-[300px] w-[100%]" />
      <Skeleton className="h-[300px] w-[100%]" />
    </div>
  );
};

const StoreDisplaySkeleton = () => {
  return (
    <div className="flex flex-col mt-3 w-full gap-3">
      <Skeleton className="h-[40px] w-[200px]" />
      {/* <Skeleton className="h-[20px] w-[400px]" /> */}
      <Skeleton className="h-[200px] w-[100%]" />
    </div>
  );
};

const ProductDisplaySkeleton = () => {
  return (
    <div className="flex flex-col mt-3 w-full gap-3">
      <Skeleton className="h-[40px] w-[200px]" />
      {/* <Skeleton className="h-[20px] w-[300px]" /> */}
      <Skeleton className="h-[100px] w-[100%]" />
    </div>
  );
};

const PostDisplaySkeleton = () => {
  return (
    <div className="flex flex-col mt-3 w-full gap-3">
      <Skeleton className="h-[40px] w-[200px]" />
      {/* <Skeleton className="h-[20px] w-[300px]" /> */}
      <div className="grid grid-cols-5 gap-4">
        <Skeleton className="aspect-[9/16] w-full" />
        <Skeleton className="aspect-[9/16] w-full" />
        <Skeleton className="aspect-[9/16] w-full" />
        <Skeleton className="aspect-[9/16] w-full" />
        <Skeleton className="aspect-[9/16] w-full" />
      </div>
    </div>
  );
};

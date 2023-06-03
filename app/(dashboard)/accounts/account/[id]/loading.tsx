import Skeleton from "@/components/ui/skeleton";

// ViewAccount skeleton
export default function Loading() {
  return (
    <div className="container">
      <div className="w-full rounded-md flex flex-col items-center  pt-0 relative">
        <div className="flex items center gap-4 absolute  md:right-4 top-0 right-0 ">
          <Skeleton className="h-[40px] w-[80px]" />
        </div>
        <div className="w-fit absolute md:left-4 top-0 left-0 ">
          <Skeleton className="h-[40px] w-[50px]" />
        </div>

        <ProfileDisplaySkeleton />

        <div className="grid md:grid-cols-2 w-full gap-4">
          <div className="md:order-1 order-3">
            <AnalyticsDisplaySkeleton />
          </div>
          <div className="w-full  flex flex-col  gap-4 order-2">
            <StoreDisplaySkeleton />
            <ProductDisplaySkeleton />
            <PostDisplaySkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
const ProfileDisplaySkeleton = () => {
  return (
    <div className="flex items-center flex-col md:flex-row gap-2 md:gap-4  rounded-md w-full md:w-1/2 relative">
      <div className=" relative aspect-square  h-20 md:h-40">
        <Skeleton className="h-[100%] w-[100px]" />
      </div>
      <div className="flex flex-col w-full items-center md:items-start gap-2">
        <Skeleton className="h-[40px] w-[200px]" />
        <Skeleton className="h-[20px] w-[100px]" />

        <div className="grid grid-cols-3 w-full items-center md:items-start  gap-4 rounded-md  justify-between relative">
          <Skeleton className="h-[50px] w-[100%]" />
          <Skeleton className="h-[50px] w-[100%]" />
          <Skeleton className="h-[50px] w-[100%]" />
        </div>
      </div>
    </div>
  );
};

const AnalyticsDisplaySkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full mt-3">
      <Skeleton className="h-[40px] w-[200px]" />
      <Skeleton className="h-[20px] w-[400px]" />
      <Skeleton className="h-[300px] w-[100%]" />
      <Skeleton className="h-[300px] w-[100%]" />
      <Skeleton className="h-[300px] w-[100%]" />
    </div>
  );
};

const StoreDisplaySkeleton = () => {
  return (
    <div className="flex flex-col mt-3 w-full gap-2">
      <Skeleton className="h-[40px] w-[200px]" />

      <Skeleton className="h-[20px] w-[400px]" />

      <div className=" mt-3">
        <Skeleton className="h-[200px] w-[100%]" />
      </div>
    </div>
  );
};

const ProductDisplaySkeleton = () => {
  return (
    <div className="flex flex-col mt-3 w-full gap-2">
      <Skeleton className="h-[40px] w-[200px]" />
      <Skeleton className="h-[20px] w-[300px]" />
      <div className=" mt-3">
        <Skeleton className="h-[400px] w-[100%]" />
      </div>
    </div>
  );
};

const PostDisplaySkeleton = () => {
  return (
    <div className="flex flex-col mt-3 w-full gap-2">
      <Skeleton className="h-[40px] w-[200px]" />
      <Skeleton className="h-[20px] w-[300px]" />
      <div className="grid grid-cols-5 gap-4 mt-3">
        <Skeleton className="aspect-[9/16] w-full" />
        <Skeleton className="aspect-[9/16] w-full" />
        <Skeleton className="aspect-[9/16] w-full" />
        <Skeleton className="aspect-[9/16] w-full" />
        <Skeleton className="aspect-[9/16] w-full" />
      </div>
    </div>
  );
};

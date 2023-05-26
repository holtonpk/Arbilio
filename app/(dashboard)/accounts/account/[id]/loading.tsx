import Skeleton from "@/components/ui/custom-skeleton";

// ViewAccount skeleton
export default function Loading() {
  return (
    <div className="container">
      <div className="w-full rounded-md flex flex-col items-center  pt-0 relative">
        <div className="flex items center gap-4 absolute  md:right-4 top-0 right-0 ">
          <Skeleton height={40} width={80} />
        </div>
        <div className="w-fit absolute md:left-4 top-0 left-0 ">
          <Skeleton height={40} width={50} />
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
        <Skeleton height={"100%"} width={"100"} />
      </div>
      <div className="flex flex-col w-full items-center md:items-start gap-2">
        <Skeleton height={40} width={200} />
        <Skeleton height={20} width={100} />
        <div className="grid grid-cols-3 w-full items-center md:items-start  gap-4 rounded-md  justify-between relative">
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
    <div className="flex flex-col gap-3 w-full mt-3">
      <Skeleton height={40} width={200} />
      <Skeleton height={20} width={400} />
      <Skeleton height={300} width={"100%"} />
      <Skeleton height={300} width={"100%"} />
      <Skeleton height={300} width={"100%"} />
    </div>
  );
};

const StoreDisplaySkeleton = () => {
  return (
    <div className="flex flex-col mt-3 w-full gap-2">
      <Skeleton height={40} width={200} />
      <Skeleton height={20} width={400} />
      <div className=" mt-3">
        <Skeleton width={"100%"} height={200} />
      </div>
    </div>
  );
};

const ProductDisplaySkeleton = () => {
  return (
    <div className="flex flex-col mt-3 w-full gap-2">
      <Skeleton height={40} width={200} />
      <Skeleton height={20} width={300} />
      <div className=" mt-3">
        <Skeleton width={"100%"} height={400} />
      </div>
    </div>
  );
};

const PostDisplaySkeleton = () => {
  return (
    <div className="flex flex-col mt-3 w-full gap-2">
      <Skeleton height={40} width={200} />
      <Skeleton height={20} width={300} />
      <div className="grid grid-cols-5 gap-4 mt-3">
        <Skeleton width={"100%"} className="aspect-[9/16]" />
        <Skeleton width={"100%"} className="aspect-[9/16]" />
        <Skeleton width={"100%"} className="aspect-[9/16]" />
        <Skeleton width={"100%"} className="aspect-[9/16]" />
        <Skeleton width={"100%"} className="aspect-[9/16]" />
      </div>
    </div>
  );
};

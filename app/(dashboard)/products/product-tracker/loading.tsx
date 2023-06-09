import Skeleton from "@/components/ui/skeleton";
import { PageHeader } from "@/components/header";
export default function Loading() {
  return (
    <>
      <PageHeader
        heading="Product Tracker"
        text={
          "Track your products and get notified when ae new post or account is found"
        }
      />
      <div className="container grid gap-4 pb-4 w-screen ">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <TrackProductSkeleton key={i} />
          ))}
      </div>
    </>
  );
}

const TrackProductSkeleton = () => {
  return (
    <div className=" p-8 border rounded-md grid gap-8 grid-cols-[1fr_75%] shadow-lg   relative">
      <div className="flex flex-col justify-between px-8">
        <div className="grid  gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-3/4 h-[28px]" />
            <Skeleton className="w-full h-[40px]" />
          </div>

          <Skeleton className="aspect-square w-full" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4  w-full  rounded-md ">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
          </div>
        </div>
      </div>
      <div className=" w-full  relative">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-[400px] mt-2" />
      </div>
    </div>
  );
};

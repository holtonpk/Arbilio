import Skeleton from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-between  mb-4 ">
        <div className="grid gap-1  container">
          <Skeleton className="w-1/2 h-12" />
        </div>
      </div>
      <div className="flex flex-col container">
        <div className="flex flex-col">
          <Skeleton className="w-[170px] h-8" />
          <div className="w-full grid xsm:grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-7 gap-10 mt-3">
            <div className="col-span-3 aspect-[60/32] h-full  flex">
              <Skeleton className="h-full aspect-[9/16]" />
              <div className="flex flex-col flex-grow  pl-4">
                <Skeleton className="w-[75px] h-3" />
                <Skeleton className="w-full h-10 mt-1" />
                <Skeleton className="w-[75px] h-3 mt-3" />
                <Skeleton className="w-full h-14 mt-1" />
                <Skeleton className="w-[75px] h-3 mt-3" />
                <Skeleton className="w-full h-14 mt-1" />
              </div>
            </div>
            <Skeleton className="h-full aspect-[9/16]" />
            <Skeleton className="h-full aspect-[9/16]" />
            <Skeleton className="h-full aspect-[9/16]" />
            <Skeleton className="h-full aspect-[9/16]" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 w-full mt-6 h-[300px]">
          <Skeleton className="w-full h-full" />
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </>
  );
}

import Skeleton from "@/components/ui/skeleton";
import { PageHeader } from "@/components/header";

export default function Loading() {
  return (
    <>
      <PageHeader
        heading={"Top Accounts"}
        text={
          "Discover the top sellers and analyze their performance over time."
        }
      />
      <div className="w-full border-t">
        <div className="w-full md:container  pt-6  flex flex-col min-h-screen items-center  ">
          <div className="flex flex-col gap-4 w-full">
            <div className="lg:grid-cols-3 w-full gap-4 hidden lg:grid  ">
              <Skeleton className="w-full h-[200px]" />
              <Skeleton className="w-full h-[200px]" />
              <Skeleton className="w-full h-[200px]" />
            </div>
            <div className="flex flex-row justify-between">
              <Skeleton className="h-[40px] w-1/2" />
              <div className="grid grid-cols-3 gap-4 w-[40%]">
                <Skeleton className="w-full h-[40px]" />
                <Skeleton className="w-full h-[40px]" />
                <Skeleton className="w-full h-[40px]" />
              </div>
            </div>
            <div className="flex  flex-col w-full gap-4 ">
              <Skeleton className="w-full h-[70px]" />
              <Skeleton className="w-full h-[70px]" />
              <Skeleton className="w-full h-[70px]" />
              <Skeleton className="w-full h-[70px]" />
              <Skeleton className="w-full h-[70px]" />
              <Skeleton className="w-full h-[70px]" />
              <Skeleton className="w-full h-[70px]" />
              <Skeleton className="w-full h-[70px]" />
              <Skeleton className="w-full h-[70px]" />
              <Skeleton className="w-full h-[70px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

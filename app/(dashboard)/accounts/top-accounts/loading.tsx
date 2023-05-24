import Skeleton from "@/components/ui/custom-skeleton";
import { PageHeader } from "@/components/header";

export default function Loading() {
  return (
    <>
      <PageHeader
        heading={"Top Accounts"}
        text={
          "Discover the top sellers and anylize their performance over time."
        }
      />
      <div className="w-full border-t">
        <div className="w-full md:container  pt-6  flex flex-col min-h-screen items-center  ">
          <div className="flex flex-col gap-4 w-full">
            <div className="lg:grid-cols-3 w-full gap-4 hidden lg:grid  ">
              <Skeleton width={"100%"} height={300} />
              <Skeleton width={"100%"} height={300} />
              <Skeleton width={"100%"} height={300} />
            </div>
            <div className="flex flex-row justify-between">
              <Skeleton width={"50%"} height={40} />
              <div className="grid grid-cols-3 gap-4 w-[40%]">
                <Skeleton width={"100%"} height={40} />
                <Skeleton width={"100%"} height={40} />
                <Skeleton width={"100%"} height={40} />
              </div>
            </div>
            <div className="flex  flex-col w-full gap-4 ">
              <Skeleton width={"100%"} height={70} />
              <Skeleton width={"100%"} height={70} />
              <Skeleton width={"100%"} height={70} />
              <Skeleton width={"100%"} height={70} />
              <Skeleton width={"100%"} height={70} />
              <Skeleton width={"100%"} height={70} />
              <Skeleton width={"100%"} height={70} />
              <Skeleton width={"100%"} height={70} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

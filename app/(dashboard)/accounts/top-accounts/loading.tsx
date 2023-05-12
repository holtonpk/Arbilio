import Skeleton from "@/components/ui/custom-skeleton";
export default function Loading() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Skeleton height={60} width={"40%"} />
        <Skeleton height={40} width={"50%"} />
      </div>
      <div className="flex flex-row mt-4 w-full  h-full  gap-8  rounded-md ">
        <div className="w-[70%]  flex flex-col rounded-md h-fit relative gap-4 ">
          <RankRowSkeleton />
        </div>
        <ExpandedAccountRankSkeleton />
      </div>
    </>
  );
}

const RankRowSkeleton = () => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((item, i) => (
          <div key={i} className="flex items-center gap-4 ">
            <Skeleton width={16} height={10} />
            <div className="w-full p-4 rounded-md flex border-2 border-border">
              <div className="w-[40%]    flex  items-center">
                <div className="h-[50px] aspect-square">
                  <Skeleton width={48} height={48} />
                </div>
                <div className="flex flex-col flex-grow  gap-2 ml-4 ">
                  <Skeleton width={"80%"} height={20} />
                  <Skeleton width={"80%"} height={20} />
                </div>
              </div>
              <div className="grid grid-cols-3  flex-grow  ">
                <Skeleton width={"90%"} height={80} />
                <Skeleton width={"90%"} height={80} />
                <Skeleton width={"90%"} height={80} />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

const ExpandedAccountRankSkeleton = () => {
  return (
    <>
      <div className="w-[30%] border-2 border-border rounded-md h-full min-h-[90vh] p-4 flex flex-col">
        <div className="flex items-center gap-4 ">
          <Skeleton height={80} width={80} />
          <div className="flex items-center gap-1">
            <Skeleton height={48} width={48} />
            <div className="flex flex-col gap-2  ">
              <Skeleton height={12} width={100} />
              <Skeleton height={12} width={100} />
            </div>
          </div>
        </div>
        <div className="grid grid-rows-3 flex-grow gap-4 mt-4 w-full o">
          <Skeleton height={"100%"} />
          <Skeleton height={"100%"} />
          <Skeleton height={"100%"} />
        </div>
      </div>
    </>
  );
};

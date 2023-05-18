import Skeleton from "@/components/ui/custom-skeleton";
export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton width={"40%"} height={40} />
      <Skeleton width={"50%"} height={50} />
      <div className="lg:grid-cols-3 w-full gap-4 hidden lg:grid  ">
        <Skeleton width={"100%"} className="aspect-square" />
        <Skeleton width={"100%"} className="aspect-square" />
        <Skeleton width={"100%"} className="aspect-square" />
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
  );
}

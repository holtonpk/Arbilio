import Skeleton from "@/components/ui/custom-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton height={40} width={"50%"} />
      <Skeleton height={40} width={"60%"} />
      <div className="grid grid-cols-3 gap-4 w-[80%]">
        <Skeleton height={100} width={"100%"} />
        <Skeleton height={100} width={"100%"} />
        <Skeleton height={100} width={"100%"} />
      </div>
      <div className="flex-col flex gap-4">
        <div className="flex items-center w-full gap-4">
          <Skeleton height={40} width={"10%"} />
          <Skeleton height={40} width={"40%"} />
        </div>
        <div className="flex items-center w-full gap-4">
          <Skeleton height={40} width={"10%"} />
          <Skeleton height={40} width={"40%"} />
        </div>
        <div className="flex items-center w-full gap-4">
          <Skeleton height={40} width={"10%"} />
          <Skeleton height={40} width={"40%"} />
        </div>
      </div>
    </div>
  );
}

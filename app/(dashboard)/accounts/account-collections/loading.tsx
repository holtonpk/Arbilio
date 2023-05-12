import Skeleton from "@/components/ui/custom-skeleton";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col gap-2">
      <Skeleton height={60} width={"40%"} />
      <div className="flex justify-between w-full">
        <Skeleton height={40} width={"50%"} />
        <Skeleton height={40} width={100} />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton height={100} width={"100%"} />
      </div>
    </div>
  );
}

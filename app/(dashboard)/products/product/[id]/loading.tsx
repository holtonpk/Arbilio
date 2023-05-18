import Skeleton from "@/components/ui/custom-skeleton";

// ViewAccount skeleton
export default function Loading() {
  return (
    <div className="grid md:grid-cols-[30%_1fr] gap-4 p-4">
      <div className="md:hidden text-2xl font-bold capitalize">
        <Skeleton width={"50%"} height={40} />
      </div>
      <div className=" grid md:grid-cols-1 grid-cols-[60%_1fr] sm:gap-4 gap-2 rounded-md h-fit ">
        <Skeleton width={"100%"} className="aspect-square" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4  w-full  rounded-md ">
          <Skeleton width={"100%"} className="aspect-square" />
          <Skeleton width={"100%"} className="aspect-square" />
          <Skeleton width={"100%"} className="aspect-square" />
          <Skeleton width={"100%"} className="aspect-square" />
          <Skeleton width={"100%"} className="aspect-square" />
          <Skeleton width={"100%"} className="aspect-square" />
          <Skeleton width={"100%"} className="aspect-square" />
          <Skeleton width={"100%"} className="aspect-square" />
        </div>
      </div>

      <section className="gap-4 rounded-md  flex flex-col ">
        <Skeleton width={"50%"} height={40} />

        <Skeleton width={"100%"} height={90} />
        <Skeleton width={"20%"} height={20} />
        <Skeleton width={"100%"} height={200} />
        <Skeleton width={"20%"} height={20} />
        <div className="grid md:grid-cols-6 grid-cols-3 gap-4 w-full">
          <Skeleton width={"100%"} className="aspect-[9/16]" />
          <Skeleton width={"100%"} className="aspect-[9/16]" />
          <Skeleton width={"100%"} className="aspect-[9/16]" />
          <Skeleton width={"100%"} className="aspect-[9/16]" />
          <Skeleton width={"100%"} className="aspect-[9/16]" />
          <Skeleton width={"100%"} className="aspect-[9/16]" />
        </div>
      </section>
    </div>
  );
}

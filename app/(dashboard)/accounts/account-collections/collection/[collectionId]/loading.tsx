import Skeleton from "@/components/ui/skeleton";
import { PageHeader } from "@/components/header";
import { AccountCardSkeleton } from "@/components/ui/account-card";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="flex gap-4  w-full items-center justify-between container mb-4">
        <div className="flex flex-row items-center gap-2 pl-2">
          <Skeleton className="h-[30px] w-[30px]" />
          <Skeleton className="h-[36px] w-[500px]" />
        </div>
        <Skeleton className="h-[40px] w-[40px]" />
      </div>

      <div className="w-full border-t ">
        <div className="w-full container   pt-4  flex flex-col  items-center  ">
          <div className="flex gap-2 w-full flex-col md:flex-row">
            <div className="flex gap-2 flex-grow">
              <Skeleton className="h-[40px] flex-grow" />
              <Skeleton className="h-[40px] w-[150px]" />
            </div>
            <div className="flex gap-2">
              <div className="flex w-fit gap-2 ">
                <Skeleton className="h-[40px] w-[40px]" />
                <Skeleton className="h-[40px] w-[40px]" />
              </div>
              <Skeleton className="h-[40px] w-[90px]" />
            </div>
          </div>

          <div className="w-full h-[90vh] rounded-md border mt-2 flex flex-col divide-y divide-border overflow-hidden">
            <TableHeader />
            {Array(20)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

const TableHeader = () => {
  return (
    <div className=" p-3 flex w-full gap-[50px] items-center">
      <div className="flex items-center gap-4">
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-[150px]  h-[24px]" />
      </div>
      <Skeleton className="flex-grow h-[24px]" />
      <Skeleton className="w-[100px] h-[24px]" />
      <Skeleton className="w-[100px] h-[24px]" />
      <Skeleton className="w-[100px] h-[24px]" />
      <Skeleton className="w-[100px] h-[24px]" />
      <Skeleton className="w-[70px] h-[24px]" />
    </div>
  );
};

const TableRow = () => {
  return (
    <div className="flex w-full gap-[50px] p-4 py-6">
      <div className="flex items-center gap-4">
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-[150px] h-[36px]" />
      </div>
      <Skeleton className="flex-grow h-[36px]" />
      <Skeleton className="w-[100px] h-[36px]" />
      <Skeleton className="w-[100px] h-[36px]" />
      <Skeleton className="w-[100px] h-[36px]" />
      <Skeleton className="w-[100px] h-[36px]" />
      <Skeleton className="w-[70px] h-[36px]" />
    </div>
  );
};

import Skeleton from "@/components/ui/custom-skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col gap-2">
      <Skeleton height={60} width={"30%"} />
      <div className="flex justify-between w-full">
        <div className="flex w-[60%] gap-2 ">
          <Skeleton height={40} width={"50%"} />
          <Skeleton height={40} width={"10%"} />
          <Skeleton height={40} width={"40%"} />
        </div>
        <div className="flex w-fit gap-2 ">
          <Skeleton height={40} width={40} />
          <Skeleton height={40} width={40} />
        </div>
      </div>
      <TableSkeleton />
    </div>
  );
}

const TableSkeleton = () => {
  const TableSecondaryRowSkeleton = () => {
    return (
      <>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`${
                i % 2 == 0 ? "bg-background" : "bg-secondary"
              } w-full overflow-hidden p-4  flex relative  h-full`}
            >
              <div className="min-w-[150px] flex items-center">
                <Skeleton height={20} width={"80%"} />
              </div>
              <div className="min-w-[150px] flex items-center">
                <Skeleton height={20} width={"80%"} />
              </div>

              <div className="min-w-[150px] flex items-center">
                <Skeleton height={20} width={"80%"} />
              </div>
            </div>
          ))}
      </>
    );
  };
  const TablePrimaryRowSkeleton = () => {
    return (
      <>
        {Array(5)
          .fill(0)
          .map((_, i) => {
            return (
              <div
                key={i}
                className={`${
                  i % 2 == 0 ? "bg-background" : "bg-secondary"
                } w-full p-4 grid grid-cols-3 items-center  h-full`}
              >
                <div className="flex items-center">
                  <Skeleton height={40} width={40} />
                  <div className="ml-4 flex flex-col gap-2">
                    <Skeleton height={15} width={100} />
                    <Skeleton height={10} width={100} />
                  </div>
                </div>
                <div className="flex items-center">
                  <Skeleton height={40} width={40} />
                  <div className="ml-4">
                    <Skeleton height={20} width={100} />
                  </div>
                </div>
                <div className=" w-full ">
                  <Skeleton height={20} width={"100%"} />
                </div>
              </div>
            );
          })}
      </>
    );
  };

  return (
    <>
      <div className="flex w-full overflow-hidden h-fit relative  ">
        <div className="min-w-[600px] w-[50%] h-full flex flex-col  left-0 z-20  ">
          <div className="w-full p-4 grid grid-cols-3  bg-secondary min-h-[60px]  ">
            {Array(3)
              .fill(0)
              .map((_: any, i: any) => (
                <div key={i} className={`flex items-center`}>
                  <Skeleton height={20} width={"90%"} />
                </div>
              ))}
          </div>

          <TablePrimaryRowSkeleton />
        </div>
        <div className="flex flex-col w-full h-full ">
          <div className=" flex-grow overflow-hidden p-4  flex bg-secondary relative min-h-[60px]">
            {Array(3)
              .fill(0)
              .map((_: any, i: any) => (
                <div key={i} className={`flex items-center`}>
                  <span className="min-w-[150px] pr-10 flex items-center">
                    <Skeleton height={20} width={"90%"} />
                  </span>
                </div>
              ))}
          </div>
          <TableSecondaryRowSkeleton />
        </div>
      </div>
    </>
  );
};

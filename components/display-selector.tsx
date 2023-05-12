"use client";
import Skeleton from "@/components/ui/custom-skeleton";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
const DisplaySelector = ({ displayType, setDisplayType }: any) => {
  const displayGrid = () => {
    setDisplayType("grid");
  };
  const displayColumns = () => {
    setDisplayType("columns");
  };
  const variant = "outline";

  return (
    <div className="flex gap-2 w-fit ">
      <Button
        onClick={displayGrid}
        className="flex items-center justify-center whitespace-nowrap"
        variant={displayType == "grid" ? "outline" : "ghost"}
        size="sm"
      >
        <Icons.grid className="h-6 w-6" />
      </Button>
      <Button
        onClick={displayColumns}
        className="flex items-center justify-center whitespace-nowrap"
        variant={displayType == "columns" ? "outline" : "ghost"}
        size="sm"
      >
        <Icons.check className="h-6 w-6" />
      </Button>
    </div>
  );
};
export default DisplaySelector;

export const DisplaySelectSkeleton = () => {
  return (
    <div className="flex gap-2 w-fit ">
      <Skeleton width={"40px"} height={"40px"} />
      <Skeleton width={"40px"} height={"40px"} />
    </div>
  );
};

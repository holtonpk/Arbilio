import { cn } from "@/lib/utils";

interface SkeletonProps {
  height?: string | number;
  width?: string | number;
  className?: string;
}

const Skeleton = ({ height, width, className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "w-full h-full bg-accent rounded-md loading-skeleton ",
        className
      )}
      style={{ height: height, width: width }}
    ></div>
  );
};

export default Skeleton;

import React from "react";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { formatNumber } from "@/lib/utils";

interface PostViewProps {
  cover: string;
  playCount: number;
}

const PostView = ({ cover, playCount }: PostViewProps) => {
  return (
    <div className="w-full aspect-[9/16] bg-primary rounded-md relative overflow-hidden">
      <Image
        src={cover}
        alt="video cover"
        fill
        sizes="(max-width: 768px) 100vw,  
          (max-width: 1200px) 50vw,
          33vw"
      />

      <div className="bg-black/70 rounded-sm absolute bottom-1 p-1 md:bottom-1 left-1 md:left-1 z-30 flex items-center text-[8px] md:text-[12px] gap-[2px] md:gap-1 text-white ">
        <Icons.showPassword className="text-2xl h-2 w-2  md:h-4 md:w-4" />
        {formatNumber(playCount)}
      </div>
    </div>
  );
};

export default PostView;

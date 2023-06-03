import React from "react";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { formatNumber } from "@/lib/utils";
import VideoPlayer from "./video-player";
import { PostType } from "@/types";
interface PostViewProps {
  video: PostType;
}

const PostView = ({ video }: PostViewProps) => {
  const [showPlayer, setShowPlayer] = React.useState(false);

  return (
    <div className="w-full aspect-[9/16] bg-primary rounded-md relative overflow-hidden">
      <Image
        src={video.cover}
        alt="video cover"
        fill
        sizes="(max-width: 768px) 100vw,  
          (max-width: 1200px) 50vw,
          33vw"
        className="z-[15]"
      />

      <VideoPlayer
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full h-fit w-fit aspect-square p-2 bg-background/70 hover:bg-background blurBack border-none "
        video={video}
        showPlayer={showPlayer}
        setShowPlayer={setShowPlayer}
      >
        <Icons.posts className="w-3 h-3 text-primary ml-[1px] fill-primary" />
      </VideoPlayer>

      <div className="bg-background/70 rounded-sm absolute bottom-1 p-1 md:bottom-1 left-1 md:left-1 z-30 flex items-center text-[8px] md:text-[12px] gap-[2px] md:gap-1 text-primary ">
        <Icons.showPassword className="text-2xl h-2 w-2  md:h-4 md:w-4" />
        {formatNumber(video.postData.playCount || 0)}
      </div>
      <Icons.media className="text-primary h-8 w-8 md:h-8 md:w-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
    </div>
  );
};

export default PostView;

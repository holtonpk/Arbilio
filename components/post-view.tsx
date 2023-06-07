import React, { useEffect } from "react";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { formatNumber } from "@/lib/utils";
import VideoPlayer from "./video-player";
import { PostType, AccountDataType } from "@/types";
import { siteConfig } from "@/config/site";

interface PostViewProps {
  // video: PostType;
  postId: string;
  accountData: AccountDataType;
}

const PostView = ({ postId, accountData }: PostViewProps) => {
  const [showPlayer, setShowPlayer] = React.useState(false);
  const [video, setVideo] = React.useState<PostType>();

  React.useEffect(() => {
    const getVideo = async () => {
      const res = await fetch(`${siteConfig.url}/api/post/${postId}`);
      const data = await res.json();
      setVideo(data);
    };
    getVideo();
  }, []);

  return (
    <div className="w-full aspect-[9/16] bg-primary border rounded-md relative overflow-hidden">
      {video && (
        <>
          <Image
            src={video.cover}
            alt="video cover"
            fill
            priority
            quality={50}
            sizes="500px" // sizes="(max-width: 768px) 100vw,
            //   (max-width: 1200px) 50vw,
            //   33vw"
            className="z-[4]"
          />

          <VideoPlayer
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] rounded-full h-fit w-fit aspect-square p-2 bg-background/70 hover:bg-background blurBack border-none "
            video={video}
            accountData={accountData}
            showPlayer={showPlayer}
            setShowPlayer={setShowPlayer}
          >
            <Icons.posts className="w-3 h-3 text-primary ml-[1px] fill-primary" />
          </VideoPlayer>

          <div className="bg-background/70 rounded-sm absolute bottom-1 p-1 md:bottom-1 left-1 md:left-1 z-[7] flex items-center text-[8px] md:text-[12px] gap-[2px] md:gap-1 text-primary ">
            <Icons.showPassword className="text-2xl h-2 w-2  md:h-4 md:w-4" />
            {formatNumber(video.postData?.playCount || 0)}
          </div>
          <Icons.media className="text-primary h-8 w-8 md:h-8 md:w-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3]" />
        </>
      )}
    </div>
  );
};

export default PostView;

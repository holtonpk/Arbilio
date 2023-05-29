"use client";
import React, { useRef, useState, useEffect } from "react";
import { useLockBody } from "@/lib/hooks/use-lock-body";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { channel } from "diagnostics_channel";
import { PostType } from "@/types";
import { LinkButton } from "@/components/ui/link";
import Image from "next/image";
import { stringify } from "querystring";
import { formatNumber, timeSince } from "@/lib/utils";
import Tooltip from "@/components/ui/tooltip";
interface VideoPlayerProps {
  showPlayer: boolean;
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  variant?:
    | "outline"
    | "default"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link"
    | null
    | undefined;
  children?: React.ReactNode;
  video: PostType;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  showPlayer,
  setShowPlayer,
  className,
  variant,
  children,
}: VideoPlayerProps) => {
  return (
    <>
      <Button
        onClick={() => setShowPlayer(true)}
        className={className}
        variant={variant}
      >
        {children}
      </Button>
      {showPlayer && <Player video={video} setShowPlayer={setShowPlayer} />}
    </>
  );
};

export default VideoPlayer;

interface PlayerProps {
  video: PostType;
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Player = ({ video, setShowPlayer }: PlayerProps) => {
  useLockBody();

  return (
    <div className="flex justify-center items-center h-screen w-screen  fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[60]">
      <div
        onClick={() => setShowPlayer(false)}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in z-[45]"
      />
      <div className=" sm:flex sm:flex-row sm:items-center sm:w-fit gap-10  relative  w-[90vw] sm:h-[90vh]">
        <Button
          onClick={() => setShowPlayer(false)}
          className="absolute sm:hidden top-2 left-3 z-[60]"
        >
          X
        </Button>
        <Video video={video} />
        <VideoInfo video={video} />
      </div>
    </div>
  );
};

const Video = ({ video }: { video: PostType }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoRef]);
  return (
    <div className="  h-full aspect-[9/16] rounded-md  relative overflow-hidden z-50 bg-muted animate-in fade-in slide-in-from-bottom-10">
      <video
        ref={videoRef}
        className=" z-[20] absolute"
        src={video.video}
        autoPlay
        loop
      />
      <Image
        src={video.cover}
        alt="video cover"
        fill
        sizes="(max-width: 768px) 100vw,  
          (max-width: 1200px) 50vw,
          33vw"
        className="z-[15] absolute"
      />

      <button
        onClick={togglePlay}
        className="absolute top-0 left-0 h-full w-full z-[65] flex justify-center items-center "
      >
        {isPlaying ? null : ( // <Icons.pause className="h-12 w-12 fill-background text-background opacity-50" />
          <Icons.posts className="h-12 w-12 fill-white text-white opacity-80" />
        )}
      </button>
    </div>
  );
};

const VideoInfo = ({ video }: { video: PostType }) => {
  return (
    <>
      <div className="hidden md:flex bottom-0 px-1  sm:px-0 relative h-full aspect-[9/16] z-[55] sm:z-50 justify-center items-center pointer-events-none">
        <div className=" z-50 items-center rounded-t-md sm:rounded-md border bg-background flex flex-col gap-3 p-2 w-full opacity-100 sm:shadow-lg animate-in fade-in slide-in-from-bottom-10  sm:zoom-in-90 sm:slide-in-from-bottom-0  pointer-events-auto">
          <LinkButton
            variant={"outline"}
            href={`accounts/account/${video.author.id}`}
            className="grid sm:grid-cols-[40px_1fr] grid-cols-[32px_1fr] items-center gap-2 group h-fit w-full "
          >
            <div className="sm:h-10 sm:w-10 h-8 w-8  rounded-md bg-muted flex justify-center relative items-center overflow-hidden">
              <Image
                src={video.author?.avatar}
                alt="Picture of the author"
                fill
                sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold ">
                {video.author.nickname}
              </h1>
              <div className="flex items-center">
                <h2 className="text-xs text-muted-foreground">
                  {"@" + video.author?.uniqueId}
                </h2>
                <p className="mx-1 ">-</p>
                <h2 className="text-xs ">
                  {timeSince(parseInt(video.createTime))}
                </h2>
              </div>
            </div>
          </LinkButton>

          <div className="hidden sm:grid grid-cols-3 md:grid-flow-col gap-3 w-fit max-w-full  ">
            <StatDisplay
              title="Plays"
              icon={"posts"}
              stat={video.postData.playCount}
            />
            <StatDisplay
              title="Comments"
              icon={"comment"}
              stat={video.postData.commentCount}
            />
            <StatDisplay
              title="Likes"
              icon={"likes"}
              stat={video.postData.diggCount}
            />
            <StatDisplay
              title="Shares"
              icon={"share"}
              stat={video.postData.shareCount}
            />
            <StatDisplay
              title="Saves"
              icon={"bookmark"}
              stat={video.postData.collectCount}
            />
          </div>
          <div className="border p-1 rounded-md w-full ">
            <p className="h-fit w-full sm:text-base text-[12px]">
              {video.desc}
            </p>
          </div>
          <LinkButton
            variant={"outline"}
            target="_blank"
            href={`https://www.tiktok.com/music/${
              video.music.title.replace(/ /g, "-") + "-" + video.music.id
            }`}
            className="flex py-2 h-fit w-full "
          >
            <Icons.music className="w-6 h-6 mr-2" />

            <p className="text-sm font-bold mr-1">{video.music.title}</p>
            {video.music.authorName && (
              <>
                <p className="mx-3 text-muted-foreground">-</p>
                <p className="text-sm text-muted-foreground">
                  {video.music.authorName}
                </p>
              </>
            )}
          </LinkButton>

          <LinkButton
            target="_blank"
            variant={"outline"}
            size={"sm"}
            href={`https://www.tiktok.com/@${video.author.uniqueId}/video/${video.postId}`}
            className="w-full hover:fill-background fill-primary"
          >
            <Icons.tiktok className="h-10 w-16" />
          </LinkButton>
        </div>
      </div>
      <div className="md:hidden grid absolute right-0 bottom-10 justify-center items-center gap-3 px-1 min-w-[10%] max-w-full z-[55]  ">
        <StatDisplay
          title="Plays"
          icon={"posts"}
          stat={video.postData.playCount}
        />
        <StatDisplay
          title="Comments"
          icon={"comment"}
          stat={video.postData.commentCount}
        />
        <StatDisplay
          title="Likes"
          icon={"likes"}
          stat={video.postData.diggCount}
        />
        <StatDisplay
          title="Shares"
          icon={"share"}
          stat={video.postData.shareCount}
        />
        <StatDisplay
          title="Saves"
          icon={"bookmark"}
          stat={video.postData.collectCount}
        />
      </div>
    </>
  );
};

const StatDisplay = ({
  icon,
  stat,
  title,
}: {
  icon: keyof typeof Icons;
  stat: number;
  title: string;
}) => {
  let Icon = Icons[icon];

  return (
    <>
      <div className="hidden md:block">
        <Tooltip content={`${title} : ${stat.toLocaleString()}`}>
          <div className="flex  w-fit gap-2 items-center">
            <div className="bg-muted flex items-center justify-center aspect-square w-fit p-2 rounded-md">
              <Icon className="w-3 h-3  text-primary fill-primary" />
            </div>
            <h2 className="relative w-fit text-sm">{formatNumber(stat)}</h2>
          </div>
        </Tooltip>
      </div>

      <div className="flex flex-col  gap-2 items-center justify-center w-full md:hidden">
        <div className="bg-muted flex items-center justify-center aspect-square w-fit p-2  rounded-md">
          <Icon className=" h-3 w-3 text-primary fill-primary" />
        </div>
        <h2 className="relative w-fit text-sm text-white font-bold">
          {formatNumber(stat)}
        </h2>
      </div>
    </>
  );
};

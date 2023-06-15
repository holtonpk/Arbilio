"use client";
import React from "react";
import { Icons } from "@/components/icons";
import Tooltip from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { TrendingPostType } from "@/types";
import { formatNumber } from "@/lib/utils";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { array } from "zod";
import { ProductOperations } from "@/components/buttons/product-operations";
import Link from "next/link";
export const TrendingPosts = ({ posts }: { posts: TrendingPostType[] }) => {
  const [selectedPostIndex, setSelectedPostIndex] = React.useState<number>(0);
  const [muteVideo, setMuteVideo] = React.useState<boolean>(true);
  const [pauseVideo, setPauseVideo] = React.useState<boolean>(false);

  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const onClick = (index: number) => {
    setSelectedPostIndex(index);
    setPauseVideo(false);
  };

  const playNextVideo = () => {
    if (!posts || isHovered) return;
    if (selectedPostIndex + 1 == posts.length) {
      setSelectedPostIndex(0);
    } else {
      setSelectedPostIndex(selectedPostIndex + 1);
    }
  };

  const playPrevVideo = () => {
    if (!posts || isHovered) return;
    if (selectedPostIndex == 0) {
      setSelectedPostIndex(posts.length - 1);
    } else {
      setSelectedPostIndex(selectedPostIndex - 1);
    }
  };
  // const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <div className="rounded-md  max-w-full border p-4">
      <div className="flex items-center">
        <h1 className="font-bold capitalize text-lg text-primary whitespace-nowrap">
          Trending Posts
        </h1>
        <Tooltip content="Create account to collections to easily monitor account performance">
          <div className="flex h-4 w-8 justify-center">
            <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
          </div>
        </Tooltip>
      </div>

      <div>
        {posts && (
          <div className="h-fit relative mt-3 px-6 sm:px-0 ">
            <Button
              onClick={playNextVideo}
              className="absolute top-1/2 -translate-y-1/2 right-0 z-[8] px-1 sm:hidden "
              variant="ghost"
            >
              <Icons.chevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              onClick={playPrevVideo}
              className="absolute top-1/2 -translate-y-1/2 left-0 z-[8] px-1 sm:hidden"
              variant="ghost"
            >
              <Icons.chevronLeft className="h-4 w-4 text-muted-foreground" />
            </Button>
            {/* place holder to container height based off ar */}
            <div className="grid xsm:grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-7   sm:px-0  xsm:gap-0 sm:gap-4 w-full relative z-[4]">
              <div className="w-full aspect-[9/16] sm:aspect-[39/64] " />
            </div>

            {window.innerWidth < 640 && (
              <div className="z-[6]  sm:hidden top-0 absolute  gap-4 mx-auto  max-w-full w-fit h-full overflow-hidden items-center">
                <div className="w-fit flex  h-full  transition-all  aspect-[39/64] xsm:aspect-[54/32] ">
                  <VideoDisplay
                    post={posts[selectedPostIndex]}
                    playNextVideo={playNextVideo}
                    setIsHovered={setIsHovered}
                    isHovered={isHovered}
                    muteVideo={muteVideo}
                    setMuteVideo={setMuteVideo}
                    pauseVideo={pauseVideo}
                    setPauseVideo={setPauseVideo}
                  />
                  <div className="hidden xsm:block  flex-grow">
                    <VideoInfo
                      post={posts[selectedPostIndex]}
                      setIsHovered={setIsHovered}
                    />
                  </div>
                </div>
              </div>
            )}
            {window.innerWidth > 640 && (
              <div
                className={`z-[6]    sm:flex top-0 absolute gap-16 sm:gap-4 mx-auto max-w-full w-fit h-full overflow-hidden items-center
            ${
              selectedPostIndex >= posts.length - 2
                ? "justify-end"
                : "justify-start"
            }`}
              >
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className={`w-fit  trendingPostTransition h-full flex transition-all
                      ${
                        selectedPostIndex === index
                          ? "aspect-[60/32]"
                          : "aspect-[60/32] sm:aspect-[39/64]"
                      }
                      `}
                  >
                    {selectedPostIndex === index ? (
                      <VideoDisplay
                        post={post}
                        playNextVideo={playNextVideo}
                        setIsHovered={setIsHovered}
                        isHovered={isHovered}
                        muteVideo={muteVideo}
                        setMuteVideo={setMuteVideo}
                        pauseVideo={pauseVideo}
                        setPauseVideo={setPauseVideo}
                      />
                    ) : (
                      <div
                        onClick={() => onClick(index)}
                        className="shadow-lg h-full aspect-[9/16]  relative rounded-md overflow-hidden group"
                      >
                        <Image
                          src={post.cover}
                          alt="video cover"
                          fill
                          priority
                          quality={50}
                          sizes="500px"
                          className="z-[4]"
                        />
                        <div className="group-hover:flex hidden absolute w-full h-full rounded-md bg-background/40 z-[6]  cursor-pointer" />
                      </div>
                    )}
                    <VideoInfo post={post} setIsHovered={setIsHovered} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const VideoDisplay = ({
  post,
  playNextVideo,
  setIsHovered,
  isHovered,
  muteVideo,
  setMuteVideo,
  pauseVideo,
  setPauseVideo,
}: {
  post: TrendingPostType;
  playNextVideo: () => void;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
  isHovered: boolean;
  muteVideo: boolean;
  setMuteVideo: React.Dispatch<React.SetStateAction<boolean>>;
  pauseVideo: boolean;
  setPauseVideo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (!pauseVideo) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPauseVideo(!pauseVideo);
    }
  };

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="shadow-lg aspect-[9/16] h-full relative rounded-md overflow-hidden transition-all duration-300 ease-in-out"
    >
      <div
        onClick={togglePlay}
        className={`h-full w-full absolute  flex items-center justify-center z-[5]
        ${pauseVideo && "bg-"}
        `}
      >
        {pauseVideo && (
          <Icons.posts className="w-12 h-12 text-white fill-white opacity-80" />
        )}
      </div>
      <video
        ref={videoRef}
        className="rounded-md z-[4] absolute"
        src={post.video}
        muted={muteVideo}
        onEnded={playNextVideo}
        autoPlay
        loop={isHovered}
      />
      <Image
        src={post.cover}
        alt="video cover"
        fill
        priority
        quality={50}
        sizes="500px"
        className="z-[3]"
      />

      <Button
        className="absolute bottom-0 left-0 z-[6] hover:bg-transparent "
        variant="ghost"
        size={"xsm"}
        onClick={() => setMuteVideo(!muteVideo)}
      >
        {muteVideo ? (
          <Icons.volume className="w-5 h-5 text-white" />
        ) : (
          <Icons.volumeX className="w-5 h-5 text-white" />
        )}
      </Button>
    </div>
  );
};

const VideoInfo = ({
  post,
  setIsHovered,
}: {
  post: TrendingPostType;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={
        "scale-in-hor-left2 flex-grow pl-4 h-full relative rounded-r-md overflow-hidden transition-all duration-300 ease-in-out "
      }
    >
      <div className="absolute w-full flex flex-col ">
        <h1 className="text-[12px]  font-semibold leading-none tracking-tight ">
          Stats
        </h1>
        <div className="w-[92%] border p-2 rounded-md mt-1  flex  justify-between ">
          <StatDisplay
            title="Plays"
            icon={"posts"}
            stat={post.postData.playCount}
          />
          <StatDisplay
            title="Comments"
            icon={"comment"}
            stat={post.postData.commentCount}
          />
          <StatDisplay
            title="Likes"
            icon={"likes"}
            stat={post.postData.diggCount}
          />
          <StatDisplay
            title="Shares"
            icon={"share"}
            stat={post.postData.shareCount}
          />

          <StatDisplay
            title="Saves"
            icon={"bookmark"}
            stat={post.postData.collectCount}
          />
        </div>

        <h1 className="text-[12px]  font-semibold leading-none tracking-tight mt-2">
          Account
        </h1>
        <div className="border mt-1 group relative w-[92%] h-[20%] rounded-md  z-[6] grid grid-cols-[32px_1fr] md:grid-cols-[32px_1fr_50px] gap-2 p-1 lg:p-2 items-center">
          <Link
            className="absolute w-full h-full z-[3]"
            href={`${siteConfig.url}/accounts/account/${post.author.id}`}
          />

          <div className="h-8 w-8 rounded-md overflow-hidden relative bg-muted border">
            <Image
              src={post.author.avatar}
              alt="user avatar"
              fill
              objectFit="cover"
              quality={50}
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="text-[12px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis group-hover:underline">
              {post.author.nickname}
            </div>
            <div className="text-[8px] text-muted-foreground">
              @{post.author.uniqueId}
            </div>
          </div>
          <div className="w-full md:block hidden ">
            <UpdateCollectionButton
              onMouseOver={() => setIsHovered(true)}
              account={post.author}
              variant="ghost"
              className="p-3 h-fit w-full relative z-[6]"
            >
              <Icons.addCollection className="h-4 w-4 " />
            </UpdateCollectionButton>
          </div>
        </div>
        {post.product && (
          <>
            <h1 className=" text-[12px]  font-semibold leading-none tracking-tight mt-2 ">
              Product
            </h1>
            <div className="border mt-1 relative group  w-[92%] h-fit rounded-md  z-[6] grid grid-cols-[32px_1fr] md:grid-cols-[32px_1fr_50px] gap-2 p-1 lg:p-2 items-center">
              <Link
                className="absolute w-full h-full z-[3]"
                href={`${siteConfig.url}/products/product/${post.product.id}`}
              />
              <div className="h-8 w-8 rounded-md overflow-hidden relative bg-muted border">
                <Image
                  src={post.product.image}
                  alt="user avatar"
                  fill
                  objectFit="cover"
                  quality={50}
                />
              </div>
              <div className="flex flex-col overflow-hidden">
                <div className="text-[12px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis group-hover:underline">
                  {post.product.title}
                </div>
              </div>
              <div className="w-full md:block hidden ">
                <ProductOperations
                  product={post.product}
                  variant="ghost"
                  className="relative z-[4]"
                >
                  <Icons.ellipsis className="h-4 w-4 " />
                </ProductOperations>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
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
      <div>
        <Tooltip content={`${title} : ${stat.toLocaleString()}`}>
          <div className="flex  w-fit gap-1 items-center">
            <div className="flex items-center justify-center aspect-square w-fit ">
              <Icon className="h-2 w-2 md:w-3 md:h-3  text-theme-blue" />
            </div>
            <h2 className="relative w-fit text-[10px] md:text-[12px]">
              {formatNumber(stat)}
            </h2>
          </div>
        </Tooltip>
      </div>
    </>
  );
};

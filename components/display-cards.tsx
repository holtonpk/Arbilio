"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import { IoHeart, IoPlay } from "react-icons/io5";
import { MdPerson, MdInfo, MdShare } from "react-icons/md";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { BsFillPlayFill } from "react-icons/bs";
import Skeleton from "@/components/ui/custom-skeleton";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { UpdateCollectionButton } from "@/components/update-collection-button";
export const AccountCard = ({ data }: any) => {
  const [favorite, setFavorite] = useState(false);
  const [expandBio, setExpandBio] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const bioRef = React.useRef<HTMLParagraphElement>(null);
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const toggleExpandBio = () => {
    setExpandBio(!expandBio);
  };

  useEffect(() => {
    if (bioRef.current) {
      setIsExpandable(bioRef.current.clientHeight > 40);
    }
  }, []);

  // const top3Posts = data.posts.itemList
  //   .sort((a: any, b: any) => b.stats.playCount - a.stats.playCount)
  //   .slice(0, 3);

  return (
    <div className="h-full relative group ">
      <div className="absolute h-1/2 pointer-events-none bottom-0 w-full bg-gradient-to-t dark:from-black/60 from-white/60 to-black/0  rounded-md z-30 hidden group-hover:block fade-in">
        <div className="flex absolute gap-2 w-fit  bottom-2 pointer-events-auto right-2">
          <UpdateCollectionButton account={data} />
        </div>
      </div>
      <Link
        href={`/accounts/account/${data.recordId}`}
        className="w-full  bg-card rounded-md h-fit border border-border pt-4  shadow-lg  pb-2 items-center relative flex flex-col  cursor-pointer "
      >
        <div className="flex items-center gap-2 w-[90%] pb-0  rounded-md ">
          <div className="aspect-square w-10 h-10 bg-muted rounded-md relative overflow-hidden">
            <Image
              src={data?.avatar}
              alt="Picture of the author"
              fill
              sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
            />
          </div>
          <div className="flex flex-col max-w-[80%] ">
            <h1 className="text-base font-bold whitespace-nowrap overflow-hidden text-ellipsis  text-primary">
              {data.nickname}
            </h1>
            <div className="text-[12px] text-gray-500  text-muted-foreground">
              {"@" + data.uniqueId}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 bg-secondary items-center rounded-md p-2 mt-4 w-[95%]">
          <div className="flex  flex-col items-center gap-1 justify-center">
            <div className="flex flex-col items-center">
              <h2 className="text-[12px] text-muted-foreground ">Likes</h2>
              <h3 className="text-base font-bold text-primary">
                {formatNumber(parseInt(data.stats.likes))}
              </h3>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1  justify-center">
            <div className="flex flex-col items-center">
              <h2 className="text-[12px] text-muted-foreground">Followers</h2>
              <h3 className="text-base font-bold text-primary">
                {formatNumber(parseInt(data.stats.followers))}
              </h3>
            </div>
          </div>
          <div className="flex  flex-col items-center gap-1  justify-center">
            <div className="flex flex-col items-center">
              <h2 className="text-[12px] text-muted-foreground">Posts</h2>
              <h3 className="text-base font-bold text-primary">
                {formatNumber(parseInt(data.stats.posts))}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-2 w-[90%]">
          <h1 className="font-bold mb-2">Top Posts</h1>
          <div className="grid grid-cols-3 gap-2 w-full ">
            {data?.topPosts.slice(0, 3).map((item: any, i: number) => {
              return (
                <div
                  key={i}
                  className=" w-full aspect-[9/16] bg-muted rounded-md relative overflow-hidden"
                >
                  <Image
                    src={item?.cover}
                    alt="video cover"
                    fill
                    sizes="(max-width: 768px) 100vw,  
                    (max-width: 1200px) 50vw,
                    33vw"
                  />

                  <div className="absolute top-2 right-2 z-30 flex items-center text-[12px] gap-1 text-white ">
                    <BsFillPlayFill className="text-2xl  h-4 w-4" />
                    {formatNumber(item.postData.postInfo.playCount)}
                  </div>
                  <span className="h-[50px] absolute -top-1 z-20 right-0      bg-gradient-to-b   from-black/80 to-black/0 w-full"></span>
                </div>
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
};

export const CollectionCard = ({ data }: any) => {
  const [favorite, setFavorite] = useState(false);
  const [expandBio, setExpandBio] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const bioRef = React.useRef<HTMLParagraphElement>(null);
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const toggleExpandBio = () => {
    setExpandBio(!expandBio);
  };

  useEffect(() => {
    if (bioRef.current) {
      setIsExpandable(bioRef.current.clientHeight > 40);
    }
  }, []);

  const top3Posts = data.posts.itemList
    .sort((a: any, b: any) => b.stats.playCount - a.stats.playCount)
    .slice(0, 3);

  // const router = useRouter();

  const goToAccount = () => {
    // router.push(`/accounts/account/${data.recordId}`);
  };

  return (
    <div className="h-full relative group  ">
      <div className="absolute h-1/2 pointer-events-none bottom-0 w-full bg-gradient-to-t from-black/50 to-black/0  rounded-md z-30 hidden group-hover:block fade-in">
        <div className="flex absolute gap-4 w-fit  bottom-2 pointer-events-auto right-2">
          <Button
            className="flex items-center justify-center whitespace-nowrap"
            variant="default"
            size="sm"
          >
            <BsThreeDotsVertical className="h-6 w-6 " />
          </Button>
          <Button
            className="flex items-center justify-center whitespace-nowrap"
            variant="default"
            size="sm"
          >
            <HiOutlineFolderAdd className="h-6 w-6 " />
          </Button>
        </div>
      </div>
      <Link
        href={`/accounts/account/${data.recordId}`}
        className="w-full bg-card rounded-md h-fit border border-border pt-4  shadow-lg  pb-2 items-center relative flex flex-col  cursor-pointer "
      >
        <div className="flex items-center gap-2 w-[90%] pb-0  rounded-md  ">
          <div className="w-10 h-10 bg-muted rounded-md relative overflow-hidden ">
            <Image
              src={data?.avatar}
              alt="Picture of the author"
              fill
              sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
            />
          </div>
          <div className="flex flex-col gap- ">
            <h1 className="text-base font-bold  text-primary ">
              {data.nickname}
            </h1>
            <div className="text-[12px]  text-muted-foreground ">
              {"@" + data.uniqueId}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 bg-secondary items-center rounded-md p-2 mt-4 w-[95%]">
          <div className="flex  flex-col items-center gap-1 justify-center">
            {/* <div className="rounded-md bg-indigo-600 aspect-square p-1 relative flex justify-center items-center">
            <IoHeart className="h-5 w-5 text-white" />
          </div> */}
            <div className="flex flex-col items-center">
              <h2 className="text-[12px] text-muted-foreground ">Likes</h2>
              <h3 className="text-base font-bold text-primary">
                {formatNumber(parseInt(data.stats.likes))}
              </h3>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1  justify-center">
            {/* <div className="rounded-md bg-indigo-600 aspect-square p-1 relative flex justify-center items-center">
            <MdPerson className="h-5 w-5 text-white" />
          </div> */}
            <div className="flex flex-col items-center">
              <h2 className="text-[12px] text-muted-foreground">Followers</h2>
              <h3 className="text-base font-bold text-primary">
                {formatNumber(parseInt(data.stats.followers))}
              </h3>
            </div>
          </div>
          <div className="flex  flex-col items-center gap-1  justify-center">
            {/* <div className="rounded-md bg-indigo-600 aspect-square p-1 relative flex justify-center items-center">
            <IoPlay className="h-5 w-5 text-white" />
          </div> */}
            <div className="flex flex-col items-center">
              <h2 className="text-[12px] text-muted-foreground">Posts</h2>
              <h3 className="text-base font-bold text-primary">
                {formatNumber(parseInt(data.stats.posts))}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-2 w-[90%]">
          <h1 className="font-bold mb-2">Top Posts</h1>
          <div className="grid grid-cols-3 gap-2 w-full ">
            {data?.topPosts.slice(0, 3).map((item: any, i: number) => {
              return (
                <div
                  key={i}
                  className=" w-full aspect-[9/16] bg-muted rounded-md relative overflow-hidden"
                >
                  <Image
                    src={item?.cover}
                    alt="video cover"
                    fill
                    sizes="(max-width: 768px) 100vw,  
                    (max-width: 1200px) 50vw,
                    33vw"
                  />

                  <div className="absolute top-2 right-2 z-30 flex items-center text-[12px] gap-1 text-white ">
                    <BsFillPlayFill className="text-2xl  h-4 w-4" />
                    {formatNumber(item.postData.postInfo.playCount)}
                  </div>
                  <span className="h-[50px] absolute -top-1 z-20 right-0      bg-gradient-to-b   from-black/80 to-black/0 w-full"></span>
                </div>
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
};

export const AccountCardSkeleton = () => {
  return (
    <div className="w-full bg-background border border-border rounded-md h-fit  pb-2 items-center relative flex flex-col">
      <div className="flex items-center gap-2 w-full pb-0 p-4">
        <Skeleton height={40} width={40} />
        <div className="flex flex-col gap-2 ">
          <Skeleton height={15} width={100} />
          <Skeleton height={10} width={100} />
        </div>
      </div>
      <div className=" p-4">
        <Skeleton height={50} width={200} />
      </div>

      <Skeleton height={60} width={"90%"} />

      <div className="flex flex-col mt-auto w-[90%] pt-8">
        <div className="grid grid-cols-3 gap-2 w-full ">
          <Skeleton height={100} width={"100%"} />
          <Skeleton height={100} width={"100%"} />
          <Skeleton height={100} width={"100%"} />
        </div>
      </div>
    </div>
  );
};

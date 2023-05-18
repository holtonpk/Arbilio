import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import Skeleton from "@/components/ui/custom-skeleton";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { ProductType } from "@/types";

interface CardDisplayProps {
  data: ProductType[];
}

const CardDisplay = ({ data }: CardDisplayProps) => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 h-full w-full ">
      {data ? (
        <>
          {data.map((item: any, i: number) => (
            <Card key={i} item={item} />
          ))}
        </>
      ) : (
        <>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <CardSkeleton key={i} />
            ))}
        </>
      )}
    </div>
  );
};

export default CardDisplay;

interface CardProps {
  item: ProductType;
}

export const Card = ({ item }: CardProps) => {
  return (
    <div className="h-full relative group ">
      <div className="absolute h-1/2 pointer-events-none bottom-0 w-full bg-gradient-to-t from-black/50 to-black/0  rounded-md z-30 hidden group-hover:block fade-in">
        <div className="flex absolute gap-4 w-fit  bottom-2 pointer-events-auto right-2">
          <Button
            className="flex items-center justify-center whitespace-nowrap"
            variant="default"
            size="sm"
          >
            <Icons.ellipsis className="h-6 w-6 " />
          </Button>
          <Button
            className="flex items-center justify-center whitespace-nowrap"
            variant="default"
            size="sm"
          >
            <Icons.crosshair className="h-6 w-6 " />
          </Button>
        </div>
      </div>
      <Link
        href={`/products/product/${item.id}`}
        className="w-full h-[200px]  bg-card rounded-md border pt- justify-center p-4 shadow-lg  pb-2 items-center relative flex flex-col  cursor-pointer "
      >
        <div className="flex items-center flex-col   gap-[2px] sm:gap-2   pb-0  rounded-md ">
          <div className="aspect-square w-32 h-32 bg-muted rounded-md relative overflow-hidden">
            <Image
              src={item.image}
              alt="Picture of the author"
              fill
              sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
            />
          </div>

          <h1 className="text-base font-bold text-ellipsis w-fit text-center  text-primary">
            {item.title}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export const CardSkeleton = () => {
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

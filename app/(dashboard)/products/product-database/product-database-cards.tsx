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
    <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 h-full w-full ">
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
      <Link
        href={`/products/product/${item.id}`}
        className="w-full   bg-card rounded-md   p-4   pb-2 items-center relative flex flex-col  cursor-pointer "
      >
        <div className="flex  flex-col  w-full  gap-[2px] sm:gap-2   pb-0  rounded-md ">
          <div className="aspect-square w-full bg-muted rounded-md relative overflow-hidden">
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
            <Image
              src={item.image}
              alt="Picture of the author"
              fill
              sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
            />
          </div>
          <div className="grid ">
            <h1 className="text-sm capitalize text-ellipsis  text-left w-fit text-primary">
              {item.title}
            </h1>
            <div className="w-[100px] flex items-center h-fit gap-2 text-muted-foreground">
              <Icons.likes className="h-5 w-5 fill-muted-foreground " />
              234
              <Icons.profile className="h-5 w-5 fill-muted-foreground " />
              16
            </div>
          </div>
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

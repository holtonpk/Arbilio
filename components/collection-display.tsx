"use client";
import React from "react";
import { Icons } from "@/components/icons";
import { array } from "zod";
import Image from "next/image";
import { CollectionOperations } from "./buttons/collection-operations";
const CollectionDisplay = () => {
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/watchlist")
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-2">Your Collections</h1>
      <div className="flex flex-col divide-y divide-border border rounded-md w-full">
        {collections.length >= 0 ? (
          <>
            <Collection data={collections} title="Top Sellers" />
            <Collection data={collections} title="Trending" />
            <Collection data={collections} title="Collection 1" />
          </>
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
};

export default CollectionDisplay;

const Collection = ({ data, title }: any) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 p-4 w-full">
      <div className="flex gap-4">
        <div className="grid">
          <h1>{title}</h1>
          <p className="text-[12px] text-muted-foreground">
            Account collection
          </p>
        </div>
        <div className="flex justify-center space-x-[-10px]">
          {data.slice(0, 3).map((item: any, i: number) => (
            <div
              key={i}
              className="aspect-square relative h-10 overflow-hidden rounded-full bg-muted border flex items-center justify-center"
            >
              <Image
                src={item?.avatar}
                alt="Picture of the author"
                fill
                sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
              />
            </div>
          ))}
          <span className="aspect-square text-sm relative h-10 overflow-hidden rounded-full bg-muted border flex items-center justify-center">
            +12
          </span>
        </div>
      </div>
      <CollectionOperations collection={data[0]} />
    </div>
  );
};

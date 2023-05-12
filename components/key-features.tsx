import React from "react";
import { Icons } from "@/components/icons";
import Link from "next/link";
const KeyFeatures = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-2">Key Features</h1>
      <div className="flex flex-col rounded-md">
        <Link
          href={"/accounts/top-account"}
          className="flex flex-row gap-4 p-4 group hover:bg-muted w-fit rounded-md cursor-pointer"
        >
          <div className="bg-muted group-hover:bg-foreground aspect-square h-10 w-10 rounded-md flex items-center justify-center">
            <Icons.rank className="h-6 w-6 group-hover:text-background" />
          </div>
          <div className="flex flex-col">
            <h2>Rankings</h2>
            <p className="text-muted-foreground">
              Find rankings of sellers based off key metrics
            </p>
          </div>
        </Link>
        <Link
          href={"accounts/account-database"}
          className="flex flex-row gap-4 p-4 group hover:bg-muted w-fit rounded-md cursor-pointer"
        >
          <div className="bg-muted group-hover:bg-foreground aspect-square h-10 w-10 rounded-md flex items-center justify-center">
            <Icons.analytics className="h-6 w-6 group-hover:text-background" />
          </div>
          <div className="flex flex-col">
            <h2>Account Stats</h2>
            <p className="text-muted-foreground">
              Track competitors with our analytics
            </p>
          </div>
        </Link>
        <Link
          href={"accounts/account-database"}
          className="flex flex-row gap-4 p-4 group hover:bg-muted w-fit rounded-md cursor-pointer"
        >
          <div className="bg-muted group-hover:bg-foreground aspect-square h-10 w-10 rounded-md flex items-center justify-center">
            <Icons.database className="h-6 w-6 group-hover:text-background" />
          </div>
          <div className="flex flex-col">
            <h2>Account Database</h2>
            <p className="text-muted-foreground">
              Access our database of over 1,000 active sellers
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default KeyFeatures;

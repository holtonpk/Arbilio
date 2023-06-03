"use client";

import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { firebaseConfig } from "@/config/firebase";
import { AccountDataType } from "@/types";

export const ProductDisplay = ({ item }: { item: AccountDataType }) => {
  return (
    <div className="grid grid-cols-[40px_1fr] items-center gap-2 ">
      {item?.product ? (
        <>
          <div className="h-10 w-10 aspect-square overflow-hidden rounded-md bg-muted flex justify-center items-center relative ">
            <Image src={item.product?.image} alt="" fill />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm ">{item.product?.title}</h1>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export const StatDisplay = ({ displayValue }: any) => {
  return <h1 className=" text-lg">{formatNumber(displayValue)}</h1>;
};

export const AccountDisplay = ({ item }: { item: AccountDataType }) => {
  console.log("ii", item);
  return (
    <Link
      href={`accounts/account/${item.id}`}
      className="grid grid-cols-[40px_1fr] items-center gap-2 group "
    >
      <div className="h-10 w-10 group-hover:opacity-50 rounded-md bg-muted flex justify-center relative items-center overflow-hidden">
        <Image
          src={item?.avatar}
          alt="Picture of the author"
          fill
          sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-sm font-semibold group-hover:text-muted-foreground">
          {item.userInfo?.user?.nickname}
        </h1>
        <h2 className="text-xs text-muted-foreground">
          {"@" + item?.uniqueId}
        </h2>
      </div>
    </Link>
  );
};

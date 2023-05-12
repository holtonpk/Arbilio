"use client";

import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { firebaseConfig } from "@/config/firebase";

export const ProductDisplay = ({ data }: any) => {
  return (
    <div className="flex items-center gap-2 ">
      {data?.product ? (
        <>
          <div className="h-10 w-10 aspect-square overflow-hidden rounded-md bg-muted flex justify-center items-center relative ">
            <Image src={data.product?.image} alt="" fill />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold">{data.product?.title}</h1>
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

export const AccountDisplay = ({ data }: any) => {
  console.log(firebaseConfig.avatarStorage + data?.avatar);
  return (
    <Link
      href={`accounts/account/${data.recordId}`}
      className="flex items-center gap-2 group "
    >
      <div className="h-10 w-10 group-hover:opacity-50 rounded-md bg-muted flex justify-center relative items-center overflow-hidden">
        <Image
          src={data?.avatar}
          alt="Picture of the author"
          fill
          sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-sm font-semibold group-hover:text-muted-foreground">
          {data?.nickname}
        </h1>
        <h2 className="text-xs group-hover:text-muted-foreground">
          {data?.uniqueId}
        </h2>
      </div>
    </Link>
  );
};

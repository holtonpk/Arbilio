"use client";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import React, { use, useEffect } from "react";
import { ProductType, AccountDataType } from "@/types";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";

interface ViewProductProps {
  data: ProductType;
}

const ViewProduct = ({ data }: ViewProductProps) => {
  return (
    <div className="grid md:grid-cols-[30%_1fr] gap-4 p-4">
      <h1 className="md:hidden text-2xl font-bold capitalize">{data.title}</h1>

      <ProductImage images={data.supplierInfo.supplierImages} />
      <section className=" rounded-md">
        <h1 className="text-2xl font-bold capitalize md:block hidden p-4">
          {data.title}
        </h1>
        <div className="grid grid-cols-3 border rounded-md p-2 mt-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[12px] sm:text-base text-muted-foreground w-fit whitespace-nowrap">
              Popularity Rank
            </h1>
            <div className="font-bold text-primary text-[12px] sm:text-lg">
              #1
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[12px] sm:text-base text-muted-foreground w-fit">
              Supplier
            </h1>

            <Icons.aliExpress className="text-2xl w-16 sm:w-20 h-[16px]" />
          </div>
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-[12px] sm:text-base text-muted-foreground w-fit">
              Supplier Price
            </h1>
            <h1 className="text-[12px] sm:text-lg  text-primary font-bold ">
              {"$" + data.supplierInfo.supplierPrice.min + "/ unit"}
            </h1>
          </div>
        </div>
        <AccountInfo accounts={data.accountsData} />
      </section>
    </div>
  );
};

export default ViewProduct;

interface ProductImageProps {
  images: string[];
}

const ProductImage = ({ images }: ProductImageProps) => {
  const [mainImage, setMainImage] = React.useState(images[0]);

  return (
    <div className=" grid md:grid-cols-1 grid-cols-[60%_1fr] sm:gap-4 gap-2 rounded-md h-fit ">
      <div className="aspect-square full relative rounded-md shadow bg-muted">
        <Image
          src={mainImage}
          alt="product image"
          fill
          className="rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4  w-full  rounded-md ">
        {images.map((image, index) => (
          <button
            onClick={() => setMainImage(image)}
            key={index}
            className={`${
              mainImage == image
                ? "border-2 border-primary box-border"
                : "hover:opacity-60"
            } w-full aspect-square relative rounded-md overflow-hidden shadow bg-muted`}
          >
            <Image src={image} alt="product image" fill />
          </button>
        ))}
      </div>
    </div>
  );
};

interface AccountInfoProps {
  accounts: AccountDataType[];
}

const AccountInfo = ({ accounts }: AccountInfoProps) => {
  const topPosts = accounts.flatMap((account) =>
    account?.topPosts?.slice(0, 3)
  );
  topPosts.sort(
    (a: any, b: any) =>
      b.postData.postInfo.playCount - a.postData.postInfo.playCount
  );

  return (
    <div className="grid  gap-4">
      <div className="flex flex-col ">
        <h1 className="text-xl mt-4">Active Sellers</h1>
        <div className="grid divide-y divide-border border rounded-md h-fit  ">
          {accounts.map((account, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 cursor-pointer group hover:bg-muted"
            >
              <Link
                href={`accounts/account/${account.recordId}`}
                className="w-[80%] grid grid-cols-[40px_1fr] gap-2"
              >
                <div className="aspect-square w-10 h-10 bg-muted rounded-md relative overflow-hidden">
                  <Image src={account.avatar} alt="product image" fill />
                </div>
                <div className="flex flex-col max-w-full overflow-hidden">
                  <h1 className="text-base font-bold whitespace-nowrap overflow-hidden text-ellipsis  text-primary">
                    {account.nickname}
                  </h1>
                  <div className="text-[12px] text-gray-500  text-muted-foreground overflow-hidden text-ellipsis">
                    {"@" + account.uniqueId}
                  </div>
                </div>
              </Link>
              <UpdateCollectionButton
                account={account}
                variant="outline"
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl">Top Post</h1>
        <div className="grid md:grid-cols-6 grid-cols-3 gap-4 w-full">
          {accounts &&
            topPosts.map((item: any, i: number) => {
              return (
                <div
                  key={i}
                  className=" w-full aspect-[9/16] bg-muted rounded-md relative overflow-hidden border shadow-lg "
                >
                  <Image
                    src={item?.cover}
                    alt="video cover"
                    fill
                    sizes="(max-width: 768px) 100vw,  
                    (max-width: 1200px) 50vw,
                    33vw"
                  />

                  <div className="absolute top-1 md:top-2 right-1 md:right-2 z-30 flex items-center text-[12px] sm:text-base md:text-[12px] gap-[2px] md:gap-1 text-white ">
                    <Icons.posts className="text-2xl h-2 w-2 sm:h-5 sm:w-5  md:h-4 md:w-4" />
                    {formatNumber(item.postData.postInfo.playCount)}
                  </div>
                  <span className="h-[50px] absolute -top-1 z-20 right-0      bg-gradient-to-b   from-black/80 to-black/0 w-full"></span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

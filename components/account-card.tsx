import React from "react";
import { AccountDataType, ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import { Icons } from "@/components/icons";
import PostView from "@/components/post-view";
import Skeleton from "@/components/ui/skeleton";
import Tooltip from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";

export const AccountCard = ({
  item,
  locked,
}: {
  item: AccountDataType;
  locked?: boolean;
}) => {
  React.useEffect(() => {
    const getVideo = async () => {
      if (!item?.topPosts) return;

      const topPostData = item?.topPosts.map(async (post) => {
        const postId = post;
        const res = await fetch(`${siteConfig.url}/api/post/${postId}`);
        const data = await res.json();
        return data;
      });
    };
  }, [item]);

  return (
    <div className="h-full relative group ">
      <div
        className={`w-full  bg-card rounded-md h-fit border  pt-4  shadow-lg  pb-2 p-2 relative flex flex-col
      ${locked && "blur-sm pointer-events-none"}
      `}
      >
        <Link
          href={`/accounts/account/${item.id}`}
          className="grid grid-cols-[70px_1fr] items-center justify-start gap-[2px] sm:gap-2  w-full pb-0  rounded-md hover:opacity-70"
        >
          <div className="aspect-square w-[70px] h-[70px] bg-muted rounded-md relative overflow-hidden border ">
            <Image
              src={item?.avatar}
              alt="Picture of the author"
              fill
              sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw"
            />
          </div>

          <div className="flex flex-col max-w-full gap-1 overflow-hidden ">
            <h1 className="text-base font-bold whitespace-nowrap overflow-hidden text-ellipsis  text-primary">
              {item.userInfo?.user?.nickname}
            </h1>

            <div className="text-[12px] text-gray-500  text-muted-foreground overflow-hidden text-ellipsis">
              {"@" + item.uniqueId}
            </div>
            <div className="flex gap-3 items-center  w-fit ">
              <div className="flex flex-row gap-2 items-center">
                {/* <h2 className="text-[12px] sm:text-sm text-muted-foreground ">
                  Likes
                </h2> */}
                <Icons.likes className="w-4 h-4 text-primary fill-primary " />
                <h3 className="text-[12px]  font-bold text-primary">
                  {formatNumber(item.accountStats[0].heartCount)}
                </h3>
              </div>

              <div className="flex flex-row gap-2 items-center">
                {/* <h2 className="text-[12px] sm:text-sm text-muted-foreground">
                  Followers
                </h2> */}
                <Icons.followers className="w-4 h-4 text-primary fill-primary" />
                <h3 className="text-[12px]  font-bold text-primary">
                  {formatNumber(item.accountStats[0].followerCount)}
                </h3>
              </div>

              <div className="flex flex-row gap-2 items-center">
                {/* <h2 className="text-[12px] sm:text-sm text-muted-foreground">
                  Posts
                </h2> */}
                <Icons.posts className="w-4 h-4 text-primary fill-primary" />
                <h3 className="text-[12px]  font-bold text-primary">
                  {formatNumber(item.accountStats[0].videoCount)}
                </h3>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex flex-col mt-2 w-full ">
          <div className="flex items-center">
            <h1 className="text-sm ">Product</h1>
            <Tooltip content="This is the main product advertised by the account">
              <div className="flex h-3 w-4 justify-center">
                <Icons.helpCircle className="h-3 w-3 text-muted-foreground" />
              </div>
            </Tooltip>
          </div>
          {item.product ? (
            <ProductDisplay productId={item.product as string} />
          ) : (
            <div className="p-1 w-full border bg-muted rounded-md">
              <div className="h-9 w-full" />
            </div>
          )}
        </div>
        <div className="flex flex-col mt-2 w-full">
          <div className="flex items-center mb-2">
            <h1 className="text-sm">Top Posts</h1>
            <Tooltip content="These are the current top 5 posts based on view count">
              <div className="flex h-3 w-4 justify-center">
                <Icons.helpCircle className="h-3 w-3 text-muted-foreground" />
              </div>
            </Tooltip>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full ">
            {Array(
              item.topPosts
                ? item.topPosts.length > 3
                  ? 3
                  : item.topPosts.length
                : 3
            )
              .fill(0)
              .map((_, i: number) => {
                return (
                  <>
                    {item.topPosts && (
                      <PostView
                        key={i}
                        postId={item.topPosts[i]}
                        accountData={item}
                      />
                    )}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDisplay = ({ productId }: { productId: string }) => {
  const [product, setProduct] = React.useState<ProductType>();

  React.useEffect(() => {
    const getProduct = async () => {
      const product = await fetch(
        `${siteConfig.url}/api/view-product/${productId}`
      ).then((res) => res.json());
      setProduct(product);
    };
    getProduct();
  }, [productId]);

  return (
    <>
      {product ? (
        <div className="grid grid-cols-[36px_1fr] relative gap-2 items-center rounded-md p-1 ">
          <Link
            href={`/products/product/${productId}`}
            className="w-full h-full z-10 rounded-md absolute hover:bg-muted"
          />
          <div className="h-9 w-9 relative overflow-hidden rounded-md z-20 pointer-events-none">
            <Image
              src={product?.image || ""}
              alt="img"
              fill
              sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            />
          </div>
          <div className="grid">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis relative z-20 pointer-events-none">
              {product?.title}
            </p>
            <p className="whitespace-nowrap text-muted-foreground text-[12px] overflow-hidden text-ellipsis relative z-20 pointer-events-none">
              {product?.supplierInfo?.supplierTitle}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid  relative  items-center rounded-md p-1 ">
            <Skeleton className="h-[36px] w-[100%]" />
          </div>
        </>
      )}
    </>
  );
};

export const AccountCardSkeleton = () => {
  return (
    <div className="w-full rounded-md h-fit border   pt-4  pb-2 p-2 relative flex flex-col gap-2">
      <div className="grid grid-cols-[70px_1fr] items-center justify-start gap-[2px] sm:gap-2  w-full pb-0 ">
        <Skeleton className="h-[70px] w-[70px]" />
        <div className="flex flex-col max-w-full h-[90%] justify-between gap-1 overflow-hidden ">
          <Skeleton className="h-[24px] w-[100%]" />
          <Skeleton className="h-[12px] w-[100%]" />
          <div className="w-full grid grid-cols-3 gap-3">
            <Skeleton className="h-[16px] w-[100%]" />
            <Skeleton className="h-[16px] w-[100%]" />
            <Skeleton className="h-[16px] w-[100%]" />
          </div>
        </div>
      </div>
      <Skeleton className="h-[20px] w-[100px]" />
      <Skeleton className="h-[36px] w-[100%]" />

      <Skeleton className="h-[20px] w-[100px] my-2" />
      <div className="grid grid-cols-3 gap-4 w-full ">
        <Skeleton className="w-full aspect-[9/16]" />
        <Skeleton className="w-full aspect-[9/16]" />
        <Skeleton className="w-full aspect-[9/16]" />
      </div>
    </div>
  );
};

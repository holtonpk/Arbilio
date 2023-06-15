"use client";
import React, {
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
// import DateRange from "@/components/date-range";
import { DateRangePicker } from "@/components/date-range-picker";
import Image from "next/image";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { Button } from "@/components/ui/button";
import { formatDateShort } from "@/lib/utils";
import { AccountDataType, ProductType } from "@/types";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import PostView from "@/components/post-view";
import { ProductOperations } from "@/components/buttons/product-operations";
import { LineChart, BarChart } from "@/components/charts";
import Tooltip from "@/components/ui/tooltip";
import { DateRange } from "react-day-picker";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataContextData {
  data: AccountDataType;
}

const DataContext = createContext<DataContextData | undefined>(undefined);

interface DataProviderProps {
  data: AccountDataType;
  children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children, data }) => {
  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

interface ViewAccountProps {
  data: AccountDataType;
}

const ViewAccount = ({ data }: ViewAccountProps) => {
  console.log("data=====>", data);

  return (
    <div className="container">
      <div className="w-full rounded-md flex flex-col items-center  pt-0 relative ">
        <DataProvider data={data}>
          <div className="grid md:grid-cols-2 w-full gap-4 relative ">
            <div className="w-full  flex flex-col  gap-4">
              <ProfileDisplay />
              {data?.product && <ProductDisplay />}
              {data?.storeUrl && <StoreDisplay />}
              {data.topPosts && <PostsDisplay />}
            </div>
            <AnalyticsDisplay />
          </div>
        </DataProvider>
      </div>
    </div>
  );
};

export default ViewAccount;

export const More = () => {
  return (
    <Button
      className="flex items-center justify-center whitespace-nowrap capitalize "
      variant="outline"
      size="lg"
    >
      <Icons.ellipsis className="h-8 w-8 " />
    </Button>
  );
};

const AnalyticsDisplay = () => {
  return (
    <div className="flex flex-col w-full mt-3">
      <div className="flex items-center  mb-3">
        <h1 className=" text-lg font-semibold leading-none tracking-tight">
          Analytics
        </h1>

        <Tooltip content=" Account growth over time ">
          <div className="flex h-4 w-8 justify-center">
            <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
          </div>
        </Tooltip>
      </div>
      <div className="grid gap-8 ">
        <DataGraph
          field="followerCount"
          title="Followers"
          // icon={<Icons.followers className="h-8 w-8 text-them-blue" />}
          icon="followers"
        />

        <DataGraph
          field="heartCount"
          title="Likes"
          // icon={<Icons.likes className="h-8 w-8 text-white" />}
          icon="likes"
          width={250}
        />

        <DataGraph
          field="videoCount"
          title="Posts"
          // icon={<Icons.posts className="h-8 w-8 text-white" />}
          icon="posts"
          width={250}
        />
      </div>
    </div>
  );
};

interface DataGraphProps {
  field: "heartCount" | "followerCount" | "videoCount";
  title: string;
  icon: keyof typeof Icons;
  width?: number;
}

const DataGraph = ({ field, title, icon }: DataGraphProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const { data } = useContext(DataContext)!;
  const orderedData = data.accountStats.sort((a: any, b: any) => {
    return a.dataCollectionTime - b.dataCollectionTime;
  });
  const [GraphData, setGraphData] = useState<any>({
    labels: orderedData.map((stat: any) =>
      formatDateShort(stat.dataCollectionTime)
    ),
    data: data.accountStats.map((stat: any) => stat[field]),
  });

  useEffect(() => {
    orderedData.map((stat: any) => formatDateShort(stat.dataCollectionTime));
    const { to, from } = dateRange || {};
    if (to && from) {
      const filteredData = orderedData.filter((stat: any) => {
        return (
          stat.dataCollectionTime >= from.getTime() &&
          stat.dataCollectionTime <= to.getTime()
        );
      });
      setGraphData({
        labels: filteredData.map((stat: any) =>
          formatDateShort(stat.dataCollectionTime)
        ),
        data: filteredData.map((stat: any) => stat[field]),
      });
    } else {
      console.log("to", to);
      console.log("from", from);
      setGraphData({
        labels: orderedData.map((stat: any) =>
          formatDateShort(stat.dataCollectionTime)
        ),
        data: orderedData.map((stat: any) => stat[field]),
      });
    }
  }, [dateRange, field, orderedData]);

  const Icon = Icons[icon];

  return (
    <div className="w-full h-fit border rounded-md p-4 relative">
      <div className="h-fit w-full flex">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/30 bg-opacity-30 text-theme-blue aspect-square p-2 rounded-md flex items-center justify-center">
            <Icon className="h-8 w-8 text-theme-blue" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-md ">{title}</h2>
            <h3 className="text-2xl font-bold">
              {formatNumber(data.accountStats[0][field])}
            </h3>
          </div>
        </div>
        <div className="absolute top-4 right-4 w-fit h-fit flex gap-3">
          <DateRangePicker date={dateRange} setDate={setDateRange} />
          <div className="">
            <Button
              onClick={() => setChartType("bar")}
              size="sm"
              variant={chartType === "line" ? "ghost" : "outline"}
              className={`${
                chartType == "bar"
                  ? "border-border bg-background hover:bg-background hover:text-primary"
                  : "hover:bg-transparent hover:border-border"
              }
          `}
            >
              <Icons.barChart className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setChartType("line")}
              size="sm"
              variant={chartType === "bar" ? "ghost" : "outline"}
              className={`${
                chartType == "line"
                  ? "border-border bg-background hover:bg-background hover:text-primary"
                  : "hover:bg-transparent hover:border-border"
              }
          `}
            >
              <Icons.lineChart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="relative h-[250px]  w-full aspect-square  mt-3  rounded-md">
        {GraphData && GraphData.labels.length > 0 ? (
          <>
            {chartType === "line" ? (
              <LineChart
                data={GraphData.data}
                labels={GraphData.labels}
                dataTitle={title}
              />
            ) : (
              <BarChart
                data={GraphData.data}
                labels={GraphData.labels}
                dataTitle={title}
              />
            )}
          </>
        ) : (
          <div className="w-full flex flex-col justify-center items-center p-10">
            <Icons.error className="h-8 w-8 text-gray-500" />
            No data for given date range
          </div>
        )}
      </div>
    </div>
  );
};

const ProductDisplay = () => {
  const { data } = useContext(DataContext)!;

  const product = data.product as ProductType;

  return (
    <>
      {data.product ? (
        <div className="grid mt-3  w-full ">
          <div className="flex items-center  mb-3">
            <h1 className="text-lg font-semibold leading-none tracking-tight ">
              Product
            </h1>
            <Tooltip content="This is the main product advertised by the account ">
              <div className="flex h-4 w-8 justify-center">
                <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
            </Tooltip>
          </div>

          <div className="grid divide-y  divide-border rounded-md border p-3 ">
            <div className="flex items-center justify-between">
              <div className="grid grid-cols-[80px_1fr] gap-4 items-center">
                <div className="w-[80px] aspect-square bg-muted rounded-md relative overflow-hidden">
                  <Image src={product.image} alt="" fill />
                </div>

                <div className="flex flex-col    ">
                  <h1 className=" text-xl whitespace-nowrap">
                    {product.title}
                  </h1>
                  {product.accounts?.length && (
                    <h1 className=" text-md text-muted-foreground">
                      Active Sellers: {product.accounts?.length}
                    </h1>
                  )}
                </div>
              </div>
              <ProductOperations variant={"outline"} product={product}>
                <Icons.ellipsis className="h-4 w-4 text-muted-foreground" />
              </ProductOperations>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const StoreDisplay = () => {
  const { data } = useContext(DataContext)!;
  const url = getBaseUrl(data?.storeUrl);
  function getBaseUrl(url: string): string | undefined {
    // If no protocol is provided, default to https://
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (e) {
      console.error("Invalid URL");
      return undefined;
    }

    return urlObj.protocol + "//" + urlObj.hostname;
  }

  const [products, setProducts] = useState<any[] | undefined>(undefined);

  useEffect(() => {
    if (!url) return;
    const getProducts = async () => {
      try {
        const res = await fetch(url + "/products.json");
        if (!res.ok) {
          // check if HTTP request is successful
          throw new Error("HTTP status " + res.status);
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (e) {
        console.log(e);
        setProducts(undefined);
      }
    };
    getProducts();
  }, [url]);

  console.log(products);

  return (
    <>
      {products && (
        <div className="grid w-full ">
          <div className="flex items-center  mb-3">
            <h1 className="text-lg font-semibold leading-none tracking-tight ">
              Store
            </h1>
            <Tooltip content="This is the store linked in the account's bio">
              <div className="flex h-4 w-8 justify-center">
                <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
            </Tooltip>
          </div>

          <div className="flex-col items-center min-w-full gap-4 p-3 border rounded-md">
            {products && (
              <>
                <div className="flex p-2 gap-2 items-center  w-full">
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg text-primary">
                      {products && products[0]?.vendor}
                    </h1>

                    <Link
                      href={data?.storeUrl}
                      target="_blank"
                      className=" flex gap-1 items-center text-muted-foreground text-sm w-[280px] overflow-hidden whitespace-nowrap text-ellipsis hover:opacity-60"
                    >
                      <Icons.link className="h-4 w-4 text-muted-foreground" />

                      {url?.replace(/^https?:\/\/(?:www\.)?/, "")}
                    </Link>
                  </div>
                </div>
                <h1 className=" text-sm text-muted-foreground">
                  {"Products in the store (" + products.length + ")"}
                </h1>
                <ScrollArea className="h-fit  border rounded-md mt-2 relative">
                  <div className="divide-y divide-border  grid h-fit  w-full ">
                    {products.map((product: any, i) => (
                      <>
                        {product?.images[0] && (
                          <Link
                            key={i}
                            target="_blank"
                            href={url + "/products/" + product.handle}
                            className="grid grid-cols-[40px_400px_1fr] items-center gap-2 p-2 group  w-full "
                          >
                            <div className="w-10 aspect-square bg-muted rounded-md flex justify-center items-center relative overflow-hidden">
                              {product?.images[0] && (
                                <Image
                                  src={product?.images[0].src}
                                  alt=""
                                  fill
                                />
                              )}
                              <Icons.media className="h-6 w-6 text-gray-500" />
                            </div>

                            <h1 className=" text-lg group-hover:text-muted-foreground  overflow-hidden text-ellipsis whitespace-nowrap">
                              {product.title}
                            </h1>
                            <div className=" w-full items-center h-10 grid grid-cols-[1fr_2px_1fr] gap-2 text-sm group-hover:text-muted-foreground whitespace-nowrap">
                              {product.variants.length}{" "}
                              {product.variants.length > 1
                                ? "variants"
                                : "variant"}
                              <Separator orientation="vertical" />
                              {"$" + product.variants[0].price}
                            </div>
                          </Link>
                        )}
                      </>
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const PostsDisplay = () => {
  const { data } = useContext(DataContext)!;
  return (
    <div className="grid w-full ">
      <div className="flex items-center  mb-3">
        <h1 className=" text-lg font-semibold leading-none tracking-tight ">
          Top Posts
        </h1>
        <Tooltip content="These are the current top 5 posts based on view count">
          <div className="flex h-4 w-8 justify-center">
            <Icons.helpCircle className="h-4 w-4 text-muted-foreground" />
          </div>
        </Tooltip>
      </div>
      <div className="grid grid-cols-5 gap-4 ">
        {data.topPosts &&
          data.topPosts.map((item: any, i) => (
            <PostView
              key={i}
              postId={item}
              accountData={data}
              preFetchedVideo={item}
            />
          ))}
      </div>
    </div>
  );
};

const ProfileDisplay = () => {
  const { data } = useContext(DataContext)!;
  return (
    <div className="flex items-center flex-col md:grid md:grid-cols-[150px_1fr] gap-4  rounded-md w-fit relative">
      <div className="rounded-md bg-muted relative aspect-square border h-20 md:h-[150px]  overflow-hidden">
        <Image
          src={data?.avatar}
          alt="Picture of the author"
          fill
          sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
        />
      </div>
      <div className="flex flex-col w-fit items-center md:items-start relative ">
        <h1 className="text-3xl font-bold w-fit ">
          {data.userInfo?.user?.nickname}
        </h1>
        <Link
          target="_blank"
          href={`https://www.tiktok.com/@${data?.uniqueId}`}
          className="text-base text-muted-foreground w-fit "
        >
          {"@" + data?.uniqueId}
        </Link>
        <UpdateCollectionButton
          account={data}
          variant={"outline"}
          className="mt-3"
        >
          <Icons.add className="h-5 w-5 mr-3" />
          Add to collection
        </UpdateCollectionButton>
      </div>
    </div>
  );
};

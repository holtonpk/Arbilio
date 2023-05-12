"use client";
import React, {
  useEffect,
  useRef,
  createContext,
  useCallback,
  ReactNode,
  useContext,
  useState,
} from "react";
import Link from "next/link";
import { formatNumber, formatDate } from "@/lib/utils";
import { IoHeart, IoPlay, IoTrendingUp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdAdd, MdPerson } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import DateRange from "@/components/DateRange";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { UpdateCollectionButton } from "@/components/update-collection-button";
import { MoreButton } from "@/components/profile-actions";
import { Line } from "react-chartjs-2";
import { BiError } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { formatDateShort } from "@/lib/utils";
import { DataSearch } from "@/components/data-search";
import { AccountDataType } from "@/types";
import Skeleton from "@/components/ui/custom-skeleton";
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
  console.log("dd", data);
  return (
    <div className=" px-4">
      <div className="w-full rounded-md flex flex-col items-center p-4 pt-0 relative">
        {data ? (
          <DataProvider data={data}>
            <div className="flex items center gap-4 absolute top-4 right-4">
              <UpdateCollectionButton account={data} variant={"default"} />
            </div>
            <div className="flex w-full">
              <ProfileDisplay />
            </div>
            <div className="w-full justify-between grid grid-cols-1 gap-4 ">
              {data?.product && <ProductDisplay />}
              {data?.bioLink && <StoreDisplay />}
            </div>
            {/* {data.topPosts && <PostsDisplay />} */}
            <AnalyticsDisplay />
          </DataProvider>
        ) : (
          <>loading .. </>
        )}
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
      <HiDotsHorizontal className="h-8 w-8 " />
    </Button>
  );
};

const AnalyticsDisplay = () => {
  return (
    <div className="flex flex-col w-full mt-3">
      <h1 className=" text-2xl text-primary">Analytics</h1>
      <h1 className=" text-lg text-muted-foreground">
        Account growth over time
      </h1>
      <div className="grid gap-8 border rounded-md p-3 ">
        <DataGraph
          field="followerCount"
          title="Followers"
          icon={<MdPerson className="h-8 w-8 text-primary" />}
        />

        <div className="grid grid-cols-2 gap-8 h-fit">
          <DataGraph
            field="heartCount"
            title="Likes"
            icon={<IoHeart className="h-8 w-8 text-primary" />}
            width={250}
          />

          <DataGraph
            field="videoCount"
            title="Posts"
            icon={<IoPlay className="h-8 w-8 text-primary" />}
            width={250}
          />
        </div>
      </div>
    </div>
  );
};

interface DataGraphProps {
  field: "heartCount" | "followerCount" | "videoCount";
  title: string;
  icon: any;
  width?: number;
}

const DataGraph = ({ field, title, icon }: DataGraphProps) => {
  const [date1, setDate1] = useState<Date | undefined>(undefined);
  const [date2, setDate2] = useState<Date | undefined>(undefined);
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
    if (date1 && date2) {
      const filteredData = orderedData.filter((stat: any) => {
        return (
          stat.dataCollectionTime >= date1.getTime() &&
          stat.dataCollectionTime <= date2.getTime()
        );
      });
      setGraphData({
        labels: filteredData.map((stat: any) =>
          formatDateShort(stat.dataCollectionTime)
        ),
        data: filteredData.map((stat: any) => stat[field]),
      });
    } else {
      setGraphData({
        labels: orderedData.map((stat: any) =>
          formatDateShort(stat.dataCollectionTime)
        ),
        data: orderedData.map((stat: any) => stat[field]),
      });
    }
  }, [date1, date2, field, orderedData]);

  return (
    <div className="w-full h-fit border rounded-md p-4 relative">
      <div className="h-fit w-full flex">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-accent aspect-square p-2 relative flex justify-center items-center">
            {icon}
          </div>
          <div className="flex flex-col">
            <h2 className="text-md ">{title}</h2>
            <h3 className="text-2xl font-bold">
              {formatNumber(data.stats[field])}
            </h3>
          </div>
        </div>
        <div className="absolute top-4 right-4 w-fit h-fit">
          <DateRange setDate1={setDate1} setDate2={setDate2} />
        </div>
      </div>
      <div className="relative h-[250px]  w-full aspect-square  mt-3  rounded-md">
        {GraphData && GraphData.labels.length > 0 ? (
          <Graph labels={GraphData.labels} data={GraphData.data} />
        ) : (
          <div className="w-full flex flex-col justify-center items-center p-10">
            <BiError className="h-8 w-8 text-gray-500" />
            No data for given date range
          </div>
        )}
      </div>
    </div>
  );
};

const ProductDisplay = () => {
  const { data } = useContext(DataContext)!;

  return (
    <div className="flex flex-col mt-3  ">
      <h1 className=" text-2xl text-primary">Product</h1>
      <h1 className=" text-lg text-muted-foreground">
        This is the main product advertised by the account
      </h1>
      <div className="flex flex-col divide-y divide-border rounded-md border p-3 mt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-[100px] aspect-square bg-muted rounded-md relative overflow-hidden">
              <Image
                src={
                  "http://127.0.0.1:8090/api/files/bum948pkcwleyzc/" +
                  data.product?.id +
                  "/" +
                  data.product?.images[0]
                }
                alt=""
                fill
              />
            </div>

            <div className="flex flex-col justify-between   ">
              <h1 className=" text-lg whitespace-nowrap">
                {data.product && data.product.title}
              </h1>
              <h1 className=" text-sm text-muted-foreground">Supplier</h1>
              <Link
                href={"/"}
                className="text-primary  w-[200px] overflow-hidden whitespace-nowrap text-ellipsis"
              >
                {data.product &&
                  data.product.supplierUrl.replace(
                    /^https?:\/\/(?:www\.)?/,
                    ""
                  )}
              </Link>
            </div>
          </div>
          <MoreButton variant="outline" />
        </div>
      </div>
    </div>
  );
};

const StoreDisplay = () => {
  const { data } = useContext(DataContext)!;
  const url = getHomePageLink(data?.bioLink);
  function getHomePageLink(url: string) {
    // Create an anchor element to parse the URL
    const anchor = document.createElement("a");
    anchor.href = url;
    // Combine the protocol, host, and port (if present) to create the home page link
    const homePageLink =
      anchor.protocol +
      "//" +
      anchor.host +
      (anchor.port ? ":" + anchor.port : "");
    return homePageLink;
  }

  const [products, setProducts] = useState<any[] | undefined>(undefined);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(url + "/products.json");
      const data = await res.json();
      setProducts(data.products);
    };
    getProducts();
  }, [url]);

  console.log(products);

  return (
    <div className="flex flex-col w-full mt-3">
      <h1 className=" text-2xl text-primary">Store</h1>
      <h1 className=" text-lg text-muted-foreground">
        The store linked in the accounts bio
      </h1>
      <div className="flex-col items-center gap-4 p-3 border rounded-md">
        {products && (
          <>
            <div className="flex p-2 gap-2 items-center  w-full">
              <div className="h-12 aspect-square rounded-md bg-muted"></div>
              <div className="flex flex-col">
                <h1 className="font-bold text-lg text-primary">
                  {products && products[0]?.vendor}
                </h1>
                <Link
                  href={data?.bioLink}
                  target="_blank"
                  className="text-muted-foreground w-[280px] overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {url.replace(/^https?:\/\/(?:www\.)?/, "")}
                </Link>
              </div>
              <MoreButton variant="outline" />
            </div>
            <h1 className=" text-sm text-muted-foreground">
              {"Products in the store (" + products.length + ")"}
            </h1>

            <div className="divide-y divide-border rounded-md border grid max-h-[300px] overflow-scroll w-full ">
              {products.map((product: any, i) => (
                <Link
                  key={i}
                  target="_blank"
                  href={url + "/products/" + product.handle}
                  className="flex items-center gap-2 p-2 group  w-full "
                >
                  <div className="w-10 aspect-square bg-muted rounded-md relative overflow-hidden">
                    <Image src={product?.images[0].src} alt="" fill />
                  </div>
                  <h1 className=" text-lg group-hover:text-muted-foreground w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.title}
                  </h1>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const PostsDisplay = () => {
  const { data } = useContext(DataContext)!;
  // const top5Posts = data.posts.itemList
  //   .sort((a: any, b: any) => b.stats.playCount - a.stats.playCount)
  //   .slice(0, 5);
  return (
    <div className="flex flex-col w-full mt-3">
      <h1 className="font-bold text-3xl mb-3 text-primary">Top Posts</h1>
      <div className="grid grid-cols-5 gap-10">
        {data.topPosts &&
          data.topPosts.map((item: any, i) => (
            <div
              key={i}
              className="w-[500px] aspect-[9/16] bg-primary rounded-md relative overflow-hidden"
            >
              <Image
                src={`http://127.0.0.1:8090/api/files/${item?.collectionId}/${item?.id}/${item?.cover}`}
                alt="video cover"
                fill
                sizes="(max-width: 768px) 100vw,  
                    (max-width: 1200px) 50vw,
                    33vw"
              />
              <div className="absolute top-2 right-2 flex items-center text-base gap-1 text-primary">
                <IoPlay className="text-2xl  h-4 w-4" />
                {formatNumber(parseInt(item.postData.postInfo.playCount))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const ProfileDisplay = () => {
  const { data } = useContext(DataContext)!;
  return (
    <div className="flex items-center  p-4 gap-4 rounded-md w-fit relative">
      <div className="rounded-md bg-muted relative aspect-square h-40  overflow-hidden">
        <Image
          src={data?.avatar}
          alt="Picture of the author"
          fill
          sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
        />
      </div>
      {/* <AccountRank /> */}
      {/* <AddToCollection /> */}
      <div className="flex flex-col ">
        <h1 className="text-3xl font-bold w-fit">{data?.nickname}</h1>
        <h2 className="text-base text-muted-foreground w-fit ">
          {"@" + data?.uniqueId}
        </h2>
        <StatDisplay />
      </div>
    </div>
  );
};

const StatDisplay = () => {
  const { data } = useContext(DataContext)!;

  return (
    <div className="grid grid-cols-3 gap-6  h-fit items-center rounded-md mt-4">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-accent aspect-square p-2 relative flex justify-center items-center">
          <IoHeart className="h-8 w-8 text-primary" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-md text-muted-foreground">Likes</h2>
          <h3 className="text-2xl font-bold text-primary">
            {formatNumber(data.stats.heartCount)}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-accent aspect-square p-2 relative flex justify-center items-center">
          <MdPerson className="h-8 w-8 text-primary" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-md text-muted-foreground">Followers</h2>
          <h3 className="text-2xl font-bold  text-primary">
            {formatNumber(data.stats.followerCount)}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-accent aspect-square p-2 relative flex justify-center items-center">
          <IoPlay className="h-8 w-8 text-primary" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-md text-muted-foreground">Posts</h2>
          <h3 className="text-2xl font-bold  text-primary">
            {formatNumber(data.stats.videoCount)}
          </h3>
        </div>
      </div>
    </div>
  );
};

const Graph = ({ labels, data, width }: any) => {
  const chartRef = useRef<any>();
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  var style = getComputedStyle(document.body);

  const configGradient = useCallback(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;
      const ctx = chartInstance.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chartInstance.height);
      const h = style.getPropertyValue("--primary-h");
      const s = style.getPropertyValue("--primary-s");
      const l = style.getPropertyValue("--primary-l");

      gradient.addColorStop(
        0,
        `hsla(${h},${s},${l} 
          , 0.1)`
      );
      gradient.addColorStop(
        1,
        `hsla(${h},${s},${l} 
          , 0.01)`
      );

      chartInstance.data.datasets[0].backgroundColor = gradient;
      chartInstance.update();
    }
  }, [style]);

  useEffect(() => {
    configGradient();
  }, [configGradient]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (label: any, index: any, labels: any) {
            return formatNumber(label);
          },
        },
        scaleLabel: {
          display: true,
          labelString: "1k = 1000",
        },
        // display: false,
        // ticks: {
        //   display: false,
        // },
        // grid: {
        //   drawBorder: false,
        //   display: false,
        // },
      },
      x: {
        // display: false,
        // ticks: {
        //   display: false,
        // },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
    layout: {},
    elements: {
      point: {
        radius: 0,
        borderWidth: 0,
      },
    },
  };

  const dataObject = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: data,
        fill: true,
        borderColor: `hsl(${style.getPropertyValue("--primary")})`,
        lineTension: 0.2,
      },
    ],
  };

  return <Line ref={chartRef} options={options} data={dataObject} />;
};

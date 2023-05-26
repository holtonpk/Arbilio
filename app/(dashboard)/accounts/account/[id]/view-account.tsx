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
import { formatNumber } from "@/lib/utils";
import DateRange from "@/components/date-range";
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
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { MoreButton } from "@/components/profile-actions";
import { Line } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link";
import { formatDateShort } from "@/lib/utils";
import { AccountDataType } from "@/types";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import PostView from "@/components/post-view";
import { ProductOperations } from "@/components/buttons/product-operations";

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
  const router = useRouter();
  return (
    <div className="container">
      <div className="w-full rounded-md flex flex-col items-center  pt-0 relative ">
        <DataProvider data={data}>
          <div className="flex items center gap-4 absolute  md:right-4 top-0 right-0 ">
            <UpdateCollectionButton account={data} variant={"outline"} />
          </div>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-fit absolute md:left-4 top-0 left-0 "
          >
            <Icons.chevronLeft className=" h-6 w-6" />
            Back
          </Button>
          <div className="flex flex-col w-fit ">
            <ProfileDisplay />
          </div>
          <div className="grid md:grid-cols-2 w-full gap-4 relative ">
            <div className="md:order-1 order-3">
              <AnalyticsDisplay />
            </div>
            <div className="w-full  flex flex-col  gap-4 order-2 ">
              {data?.product && <ProductDisplay />}
              {data?.storeUrl && <StoreDisplay />}
              {data.topPosts && <PostsDisplay />}
            </div>
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
      <h1 className=" text-2xl text-primary">Analytics</h1>
      <h1 className=" text-lg text-muted-foreground">
        Account growth over time
      </h1>
      <div className="grid gap-8  mt-3">
        <DataGraph
          field="followerCount"
          title="Followers"
          icon={<Icons.followers className="h-8 w-8 text-muted-foreground" />}
        />

        <DataGraph
          field="heartCount"
          title="Likes"
          icon={<Icons.likes className="h-8 w-8 text-muted-foreground" />}
          width={250}
        />

        <DataGraph
          field="videoCount"
          title="Posts"
          icon={<Icons.posts className="h-8 w-8 text-muted-foreground" />}
          width={250}
        />
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
          <div className="rounded-md bg-muted aspect-square p-2 relative flex justify-center items-center">
            {icon}
          </div>
          <div className="flex flex-col">
            <h2 className="text-md ">{title}</h2>
            <h3 className="text-2xl font-bold">
              {formatNumber(data.accountStats[0][field])}
            </h3>
          </div>
        </div>
        <div className="absolute top-4 right-4 w-fit h-fit">
          <DateRange setDate1={setDate1} setDate2={setDate2} />
        </div>
      </div>
      <div className="relative h-[250px]  w-full aspect-square  mt-3  rounded-md">
        {GraphData && GraphData.labels.length > 0 ? (
          <Graph
            labels={GraphData.labels}
            data={GraphData.data}
            dataTitle={title}
          />
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
  return (
    <>
      {data.product ? (
        <div className="grid mt-3  w-full ">
          <h1 className=" text-2xl text-primary">Product</h1>
          <h1 className=" text-lg text-muted-foreground">
            This is the main product advertised by the account
          </h1>
          <div className="grid divide-y  divide-border rounded-md border p-3 mt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="w-[100px] aspect-square bg-muted rounded-md relative overflow-hidden">
                  <Image src={data.product.image} alt="" fill />
                </div>

                <div className="grid justify-between   ">
                  <h1 className=" text-lg whitespace-nowrap">
                    {data.product.title}
                  </h1>
                  <h1 className=" text-sm text-muted-foreground">Supplier</h1>
                  <Link
                    href={"/"}
                    className="text-primary  w-[200px] overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {data.product.supplierUrl.replace(
                      /^https?:\/\/(?:www\.)?/,
                      ""
                    )}
                  </Link>
                </div>
              </div>
              <ProductOperations product={data.product} variant="outline">
                <Icons.ellipsis className="h-4 w-4 " />
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
  console.log(url);

  function getBaseUrl(url: string): string {
    // If no protocol is provided, default to https://
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (e) {
      console.error("Invalid URL");
      return "";
    }

    return urlObj.protocol + "//" + urlObj.hostname;
  }

  const [products, setProducts] = useState<any[] | undefined>(undefined);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(url + "/products.json");
        const data = await res.json();
        setProducts(data.products);
      } catch (e) {
        console.log(e);
      }
    };
    try {
      getProducts();
    } catch (e) {
      console.log(e);
    }
  }, [url]);

  console.log(products);

  return (
    <>
      {products && (
        <div className="grid w-full ">
          <h1 className=" text-2xl text-primary">Store</h1>
          <h1 className=" text-lg text-muted-foreground">
            The store linked in the accounts bio
          </h1>
          <div className="flex-col items-center min-w-full gap-4 p-3 border rounded-md">
            {products && (
              <>
                <div className="flex p-2 gap-2 items-center  w-full">
                  {/* <div className="h-12 aspect-square rounded-md bg-muted relative overflow-hidden border">
                  <Image src={data.avatar} alt="" fill />
                </div> */}
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

                      {url.replace(/^https?:\/\/(?:www\.)?/, "")}
                    </Link>
                  </div>
                </div>
                <h1 className=" text-sm text-muted-foreground">
                  {"Products in the store (" + products.length + ")"}
                </h1>

                <div className="divide-y divide-border rounded-md border grid max-h-[300px] overflow-scroll w-full ">
                  {products.map((product: any, i) => (
                    <>
                      {product?.images[0] && (
                        <Link
                          key={i}
                          target="_blank"
                          href={url + "/products/" + product.handle}
                          className="flex items-center gap-2 p-2 group  w-full "
                        >
                          <div className="w-10 aspect-square bg-muted rounded-md flex justify-center items-center relative overflow-hidden">
                            {product?.images[0] && (
                              <Image src={product?.images[0].src} alt="" fill />
                            )}
                            <Icons.media className="h-6 w-6 text-gray-500" />
                          </div>
                          <h1 className=" text-lg group-hover:text-muted-foreground w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                            {product.title}
                          </h1>
                        </Link>
                      )}
                    </>
                  ))}
                </div>
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
      <h1 className=" text-2xl text-primary">Top Posts</h1>
      <h1 className=" text-lg text-muted-foreground">Top 5 posts by views</h1>
      <div className="grid grid-cols-5 gap-4 mt-3">
        {data.topPosts &&
          data.topPosts.map((item: any, i) => (
            <PostView
              key={i}
              cover={item?.cover}
              playCount={item.postData.playCount}
            />
          ))}
      </div>
    </div>
  );
};

const ProfileDisplay = () => {
  const { data } = useContext(DataContext)!;
  return (
    <div className="flex items-center flex-col md:flex-row gap-4  rounded-md w-fit relative">
      <div className="rounded-md bg-muted relative aspect-square shadow-lg dark:border h-20 md:h-40  overflow-hidden">
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
      <div className="flex flex-col w-fit items-center md:items-start ">
        <h1 className="text-3xl font-bold w-fit ">
          {data.userInfo?.user?.nickname}
        </h1>
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
    <div className="flex md:grid md:grid-cols-3  md:gap-6 gap-3  h-fit items-center rounded-md mt-4">
      <div className="flex items-center gap-3 ">
        <div className="rounded-md bg-muted aspect-square p-2 relative flex justify-center items-center">
          <Icons.likes className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-md text-muted-foreground">Likes</h2>
          <h3 className="text-xl md:text-2xl font-bold text-primary">
            {formatNumber(data.accountStats[0].heartCount)}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <div className="rounded-md bg-muted aspect-square p-2 relative flex justify-center items-center">
          <Icons.followers className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-md text-muted-foreground">Followers</h2>
          <h3 className="text-xl md:text-2xl font-bold  text-primary">
            {formatNumber(data.accountStats[0].followerCount)}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <div className="rounded-md bg-muted aspect-square p-2 relative flex justify-center items-center">
          <Icons.posts className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-md text-muted-foreground">Posts</h2>
          <h3 className="text-xl md:text-2xl font-bold  text-primary">
            {formatNumber(data.accountStats[0].videoCount)}
          </h3>
        </div>
      </div>
    </div>
  );
};

const Graph = ({ labels, data, dataTitle }: any) => {
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

  const [hoverValue, setHoverValue] = useState<{ x: string; y: number } | null>(
    null
  );
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

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
    onHover: (event: any, chartElement: any) => {
      if (chartElement.length > 0) {
        const index = chartElement[0].index;
        const datasetIndex = chartElement[0].datasetIndex;
        const x = dataObject.labels[index];
        const y = dataObject.datasets[datasetIndex].data[index];
        if (hoverValue?.x !== x || hoverValue?.y !== y) {
          setHoverValue({ x, y });
        }
        if (
          position?.x !== chartElement[0].element.x ||
          position?.y !== chartElement[0].element.y
        ) {
          setPosition({
            x: chartElement[0].element.x,
            y: chartElement[0].element.y,
          });
        }
      } else {
        setPosition(null);
        setHoverValue(null);
      }
    },
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
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },

    elements: {
      point: {
        radius: 0,
        borderWidth: 0,
        hitRadius: 50,
        hoverBorderWidth: 10,
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

  type DateObject = {
    month: string;
    day: number;
  };
  function convertDateString(dateStr: string): DateObject {
    const dateParts = dateStr.split("-");
    if (dateParts.length !== 2) {
      throw new Error("Invalid date string. Expected format: m-d");
    }
    const monthIndex = parseInt(dateParts[0], 10) - 1; // months are 0-based in JavaScript Date
    const day = parseInt(dateParts[1], 10);
    if (isNaN(monthIndex) || isNaN(day)) {
      throw new Error(
        "Invalid date string. Expected numeric month and day values."
      );
    }

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[monthIndex];

    if (!month) {
      throw new Error("Invalid month. Expected a value between 1 and 12.");
    }

    return { month, day };
  }

  return (
    <>
      {position && (
        <div
          style={{ top: position.y - 30, left: position.x }}
          className="pointer-events-none absolute bg-muted rounded-md fade-in p-2 flex  gap-2 shadow-lg items-center justify-center -translate-y-full -translate-x-1/2"
        >
          <div className="flex flex-col items-center  rounded-full h-12 w-12  p-1  bg-foreground aspect-square">
            <h1 className="text-sm leading-[16px] font-bold text-background">
              {hoverValue ? convertDateString(hoverValue.x).day : ""}
            </h1>
            <h1 className="text-base text-background">
              {hoverValue ? convertDateString(hoverValue?.x).month : ""}
            </h1>
          </div>
          <div className="grid">
            <h1 className="font-bold">{hoverValue?.y.toLocaleString()}</h1>
            <h1 className="font-bold">{dataTitle}</h1>
          </div>
          <Icons.triangle className="h-4 w-4 text-muted fill-muted rotate-180 absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-full" />
        </div>
      )}
      <Line
        onMouseLeave={() => setPosition(null)}
        onBlur={() => setPosition(null)}
        ref={chartRef}
        options={options}
        data={dataObject}
      />
    </>
  );
};

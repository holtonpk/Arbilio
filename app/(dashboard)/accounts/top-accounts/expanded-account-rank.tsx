"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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
import { Line } from "react-chartjs-2";
import {
  formatNumber,
  timeSince,
  timeDifference,
  configPercentChange,
} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@/components/ui/custom-skeleton";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
const ExpandedAccountRank = ({ expandedAccountData }: any) => {
  const [graphData, setGraphData] = useState<any>(undefined);

  useEffect(() => {
    if (expandedAccountData) {
      fetch(
        `${siteConfig.url}/api/account/${expandedAccountData.account.recordId}`
      )
        .then((res) => res.json())
        .then((res) => {
          //  sort res by dataCollectionTime

          const orderedData = res.accountStats.sort((a: any, b: any) => {
            return a.dataCollectionTime - b.dataCollectionTime;
          });

          const GraphData = {
            labels: orderedData.map((stat: any) => stat.dataCollectionTime),
            followers: res.accountStats.map((stat: any) => stat.followerCount),
            likes: res.accountStats.map((stat: any) => stat.heartCount),
            posts: res.accountStats.map((stat: any) => stat.videoCount),
          };
          setGraphData(GraphData);
        });
    }
  }, [expandedAccountData]);

  return (
    <>
      {expandedAccountData ? (
        <>
          <div className="w-[30%]  border-2 border-border   rounded-md h-[80%] min-h-[95vh]  p-4 flex flex-col">
            <div className="flex items-center gap-4 ">
              <div className="h-16 w-16 bg-accent rounded-md aspect-square flex items-center justify-center text-2xl font-bold text-primary">
                {"#" + expandedAccountData?.rank}
              </div>

              <Link
                href={`/accounts/account/${expandedAccountData?.account.recordId}`}
                className="flex items-center gap-4"
              >
                <div className="h-12 w-12 aspect-square bg-muted rounded-md relative overflow-hidden">
                  <Image
                    src={expandedAccountData?.account.avatar}
                    alt="Picture of the author"
                    fill
                    sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  />
                </div>
                <div className="flex flex-col ">
                  <h1 className="font-bold text-lg w-[200px] text-primary">
                    {expandedAccountData?.account.nickname}
                  </h1>

                  <div
                    className=" font-bold  hover:opacity-50 text-sm text-gray-500 text-muted-foreground"
                    // href={`https://www.tiktok.com/@${expandedAccountData?.account.uniqueId}`}
                  >
                    {"@" + expandedAccountData?.account.uniqueId}
                  </div>
                </div>
              </Link>
            </div>
            <div className="grid grid-rows-3 flex-grow gap-4 mt-4 overflow-hidden ">
              {graphData && (
                <>
                  <DataGraphContainer
                    title="Followers"
                    labels={graphData.labels}
                    data={graphData.followers}
                  />
                  <DataGraphContainer
                    title="Likes"
                    labels={graphData.labels}
                    data={graphData.likes}
                  />
                  <DataGraphContainer
                    title="Posts"
                    labels={graphData.labels}
                    data={graphData.posts}
                  />
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <ExpandedAccountRankSkeleton />
      )}
    </>
  );
};

export default ExpandedAccountRank;

const ExpandedAccountRankSkeleton = () => {
  return (
    <>
      <div className="w-[30%] border-2 border-border rounded-md h-full min-h-[90vh] p-4 flex flex-col">
        <div className="flex items-center gap-4 ">
          <Skeleton height={80} width={80} />
          <div className="flex items-center gap-1">
            <Skeleton height={48} width={48} />
            <div className="flex flex-col gap-2  ">
              <Skeleton height={12} width={100} />
              <Skeleton height={12} width={100} />
            </div>
          </div>
        </div>
        <div className="grid grid-rows-3 flex-grow gap-4 mt-4 w-full o">
          <Skeleton height={"100%"} />
          <Skeleton height={"100%"} />
          <Skeleton height={"100%"} />
        </div>
      </div>
    </>
  );
};

const DataGraphContainer = ({ title, labels, data }: any) => {
  return (
    <div className="max-w-full w-[100%] mx-auto  h-full border-2 border-border rounded-md flex flex-col relative overflow-hidden ">
      <div className="absolute flex flex-col p-4 px-6 items-center">
        <h1 className="text-base font-bold text-primary">{title}</h1>
        <h1 className="text-2xl text-primary font-bold">
          {formatNumber(data[data.length - 1])}
        </h1>
        <div className="flex flex-row items-center text-muted-foreground gap-1">
          <Icons.trendingUp />{" "}
          {configPercentChange(data[data.length - 1], data[0])}
        </div>
      </div>
      <div className="absolute top-4 right-4 text-muted-foreground">
        {timeDifference(labels[0], labels[labels.length - 1])}
      </div>
      <div className="absolute  w-[105%] -bottom-1  left-1/2 -translate-x-1/2  mt-auto">
        <Graph labels={labels} data={data} />
      </div>
    </div>
  );
};

const Graph = ({ labels, data }: any) => {
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
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      x: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
    layout: {
      padding: -20,
    },
    elements: {
      point: {
        radius: 1,
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

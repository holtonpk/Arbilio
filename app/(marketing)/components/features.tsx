"use client";
import React from "react";
import HeroHeader from "@/app/(marketing)/components/hero-header";
import { Icons } from "@/components/icons";
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

const Feature = () => {
  return (
    <div className="flex flex-col items-center ">
      <HeroHeader
        gradient="bg-gradient-to-r from-purple-400 to-pink-600"
        number="1"
        title="Discover"
        subtitle="Explore 500+ active sellers"
        description="This project is an experiment to see how a modern app, with features like auth, subscriptions, API routes, and static pages would work in Next.js 13 app dir."
      />
      <div className="pt-10 md:w-[750px] w-[400px]">
        <div className="w-[400px] md:w-[500px]  aspect-[1.6/1] rounded border shadow-md overflow-hidden">
          <div className="top-0 h-10 border-b relative">
            <div className="flex gap-2 w-fit top-0 left-0 p-3">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
            </div>
            <div className="h-6 md:w-[300px] w-[250px] text-sm px-7 text-primary rounded-md bg-muted-foreground/20 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center">
              <Icons.lock className="h-3 w-3  absolute left-2 top-1/2 -translate-y-1/2" />
              <h1 className="max-w-full overflow-hidden text-ellipsis">
                TikDrop.io/accounts/accountDatabase
              </h1>
              <Icons.rotate className="h-3 w-3  absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="h-full w-full p-4">
            <div className="flex gap-4">
              <div className="w-1/2 h-6 rounded-md bg-muted"></div>
              <div className="w-10 h-6 rounded-md bg-muted"></div>
              <div className="w-10 h-6 rounded-md bg-muted"></div>
            </div>
            <div className="gap-4 grid grid-cols-4 md:grid-cols-5 w-fit mx-auto pt-4   ">
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/70 h-[100px] w-20 rounded-md relative">
                <Icons.mousePointer className="h-6 w-6 absolute fill-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </span>
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
              <span className="bg-muted-foreground/30 h-[100px] w-20 rounded-md" />
            </div>
          </div>
        </div>
        <div className="w-[400px] md:w-[500px]  h-fit overflow-hidden  rounded border md:translate-x-1/2 translate-x-4 md:-translate-y-[70%] -translate-y-[10%] bg-background  shadow-md">
          <div className="top-0 h-10 border-b relative">
            <div className="flex gap-2 w-fit top-0 left-0 p-3">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
            </div>
            <div className="h-6  md:w-[300px] w-[250px] text-sm px-7 text-primary rounded-md bg-muted-foreground/20 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center">
              <Icons.lock className="h-3 w-3  absolute left-2 top-1/2 -translate-y-1/2" />
              <h1 className="max-w-full overflow-hidden text-ellipsis">
                TikDrop.io/accounts/viewAccount
              </h1>
              <Icons.rotate className="h-3 w-3  absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="h-full w-full p-4 relative">
            <div className="flex w-full gap-4">
              <span className="md:h-20 md:w-20 h-16 w-16 bg-muted-foreground/50 rounded-md "></span>
              <div className="flex flex-col w-[60%] gap-4">
                <div className="w-1/2 h-6 rounded-md bg-muted"></div>
                <div className="w-10 h-6 rounded-md bg-muted"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 relative">
              <span className="h-40 w-full border rounded-md  relative overflow-hidden">
                <div className="absolute  w-[105%] -bottom-1  left-1/2 -translate-x-1/2  mt-auto">
                  <Graph
                    labels={[1, 2, 3, 4, 5, 6, 7]}
                    data={[5, 8, 15, 12, 13, 28, 35]}
                  />
                </div>
              </span>
              <span className="h-40 w-full border rounded-md  relative overflow-hidden">
                <div className="absolute  w-[105%] -bottom-1  left-1/2 -translate-x-1/2  mt-auto">
                  <Graph
                    labels={[1, 2, 3, 4, 5, 6, 7]}
                    data={[17, 17, 15, 17, 26, 20, 22]}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg  p-2">
        <div className="flex h-fit flex-col justify-between rounded-md ">
          <div className="bg-muted p-3 flex items-center justify-center w-fit h-fit mb-2 rounded-md">
            <Icons.analytics />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold">Easy view account Growth</h3>
            <p className="text-sm text-muted-foreground">
              Easy view account Growth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;

const Graph = ({ labels, data }: any) => {
  const chartRef = React.useRef<any>();
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

  const configGradient = React.useCallback(() => {
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

  React.useEffect(() => {
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

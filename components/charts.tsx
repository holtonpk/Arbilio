import React, { useState, useRef, useCallback, useEffect } from "react";
import { formatNumber } from "@/lib/utils";
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
import { MoreButton } from "@/components/profile-actions";
import { Line } from "react-chartjs-2";
interface GraphProps {
  labels: string[];
  data: number[];
  dataTitle: string;
}

export const LineChart = ({ labels, data, dataTitle }: GraphProps) => {
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

  const [hoverValue, setHoverValue] = useState<{ x: string; y: number } | null>(
    null
  );
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

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
          className="pointer-events-none absolute bg-muted rounded-md fade-in p-2 flex  gap-2 shadow-lg items-center justify-center -translate-y-full -translate-x-1/2 transition-transform duration-200"
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

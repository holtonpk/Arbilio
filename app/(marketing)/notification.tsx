"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";

export const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring" } },
};

const Notification = () => {
  const prices = ["32.54", "152.92", "29.95", "12.72"];
  return (
    <div className="flex w-fit  mx-auto">
      <motion.ul
        key={6} // workaround for https://github.com/framer/motion/issues/776, add 1 to account for the demo GH link
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.5,
            },
          },
        }}
        className="mt-3 flex flex-col gap-4 items-center"
      >
        <div className="w-[70%] min-w-fit rounded-xl  text-center  font-bold  p-3 relative flex justify-center items-center  ">
          Harness the power of {siteConfig.name} and watch your sales explode!
        </div>
        {prices.map((price, i) => (
          <NotificationCard
            key={i}
            price={price}
            time={`${i == 0 ? "now" : i + 1 + "s  ago"}`}
          />
        ))}
      </motion.ul>
    </div>
  );
};

export default Notification;

const NotificationCard = ({ price, time }: { price: string; time: string }) => {
  return (
    <motion.li variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}>
      <div className="w-full rounded-xl  bg-primary/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur  p-3 relative grid md:grid-cols-[48px_1fr] grid-cols-[40px_1fr] gap-3 items-center pr-8 ">
        <div className="h-10 w-10 md:h-12 md:w-12 relative overflow-hidden rounded-xl bg-white p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full "
            fill="none"
            viewBox="0 0 54 61"
          >
            <path
              fill="#95BF47"
              d="M46.376 11.553a.582.582 0 00-.526-.489c-.218-.018-4.49-.083-4.49-.083s-3.572-3.47-3.925-3.822c-.353-.353-1.042-.247-1.31-.167-.003.002-.67.208-1.794.556a12.581 12.581 0 00-.86-2.11c-1.27-2.427-3.134-3.71-5.384-3.714h-.009c-.156 0-.31.015-.467.028a6.88 6.88 0 00-.203-.234c-.98-1.05-2.238-1.56-3.744-1.515-2.906.083-5.801 2.182-8.148 5.91-1.652 2.624-2.908 5.92-3.264 8.472-3.338 1.034-5.672 1.756-5.723 1.773-1.685.529-1.738.58-1.958 2.169C4.408 19.527 0 53.61 0 53.61L36.94 60l16.01-3.98s-6.533-44.164-6.574-44.467zM32.48 8.121l-2.866.887c-.022-1.471-.196-3.519-.882-5.288 2.205.418 3.29 2.913 3.748 4.401zm-4.799 1.486l-6.167 1.91c.596-2.282 1.726-4.555 3.114-6.044.516-.555 1.239-1.172 2.095-1.525.803 1.678.978 4.053.958 5.66zm-3.96-7.67c.683-.015 1.257.135 1.748.458-.786.408-1.545.994-2.257 1.758-1.846 1.98-3.261 5.055-3.825 8.021-1.76.545-3.481 1.079-5.066 1.568 1-4.669 4.914-11.675 9.4-11.805z"
            ></path>
            <path
              fill="#5E8E3E"
              d="M45.851 11.066c-.218-.019-4.489-.084-4.489-.084s-3.572-3.469-3.925-3.821a.873.873 0 00-.496-.228l.002 53.065L52.95 56.02s-6.532-44.162-6.574-44.465a.583.583 0 00-.526-.49z"
            ></path>
            <path
              fill="#fff"
              d="M28.067 19.297l-1.86 6.956s-2.074-.943-4.532-.788c-3.606.228-3.644 2.501-3.607 3.072.196 3.111 8.38 3.79 8.84 11.078.361 5.733-3.041 9.655-7.943 9.965-5.885.37-9.124-3.1-9.124-3.1l1.247-5.303s3.26 2.46 5.87 2.295c1.706-.108 2.315-1.495 2.253-2.475-.256-4.058-6.921-3.819-7.342-10.487-.355-5.611 3.33-11.298 11.462-11.81 3.133-.202 4.736.597 4.736.597z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col">
          <p className="text-sm md:text-base font-bold text-primary">Shopify</p>
          <p className="text-[12px] md:text-sm text-primary">
            Your store has a new order for 1 item totaling ${price} from Online
            Store.
          </p>
        </div>

        <div className="absolute text-[12px] md:text-sm  top-3 right-3 text-muted-foreground">
          {time}
        </div>
      </div>
    </motion.li>
  );
};

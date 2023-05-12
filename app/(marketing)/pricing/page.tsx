"use client";
import Link from "next/link";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MdCheck } from "react-icons/md";

export default function PricingPage() {
  const [monthly, setMonthly] = useState(false);
  return (
    <section className="container flex flex-col items-center  gap-6 py-8 ">
      <div className="mx-auto flex w-fit items-center flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Choose your plan
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          7 day free trial. No credit card required.
        </p>
        <div className="flex items-center gap-3">
          <p
            className={`${
              monthly ? "text-muted-foreground" : "text-primary"
            } font-bold`}
          >
            Monthly
          </p>
          <Switch
            checked={monthly}
            onChange={setMonthly}
            className={`${monthly ? "bg-muted" : "bg-muted"}
          relative inline-flex h-[32px] border-border w-[64px] shrink-0 cursor-pointer rounded-full border-2  transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${monthly ? "translate-x-8" : "translate-x-0"}
            pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-primary shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <div
            className={`${
              monthly ? "text-primary" : "text-muted-foreground"
            } font-bold flex items-center gap-3 relative`}
          >
            Yearly
            <div className=" text-primary text-[12px] border border-primary whitespace-nowrap py-1 rounded-full px-4 absolute -right-2 translate-x-full">
              Save 20%
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 w-[80%] h-fit">
        <PricingCard />
        <PricingCard2 />
        <PricingCard />
      </div>
    </section>
  );
}

const PricingCard = () => {
  return (
    <div className="flex flex-col items-center  gap-6 rounded-lg border w-full p-8 translate-y-10 h-[500px] ">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-xl font-bold sm:text-2xl w-fit ">PRO plan</h3>
        <div className="flex flex-row items-center w-fit">
          <h4 className="text-7xl font-bold">$19</h4>
          <p className="text-sm font-medium text-muted-foreground">/MO</p>
        </div>
        <ul className="grid gap-3 text-md text-muted-foreground w-fit  ">
          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Unlimited Posts
          </li>
          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Unlimited Users
          </li>

          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Custom domain
          </li>
          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Dashboard Analytics
          </li>
          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Access to Discord
          </li>
          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Premium Support
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
          Get Started
        </Link>
      </div>
    </div>
  );
};

const PricingCard2 = () => {
  return (
    <div className="flex flex-col items-center h-[540px]  gap-6 rounded-lg border bg-muted w-full p-8 relative pt-16 overflow-hidden">
      <div className="w-full h-10 bg-primary absolute top-0 left-0 flex justify-center items-center text-background">
        Most popular
      </div>
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-xl font-bold sm:text-2xl w-fit ">PRO plan</h3>
        <div className="flex flex-row items-center w-fit">
          <h4 className="text-7xl font-bold">$19</h4>
          <p className="text-sm font-medium text-muted-foreground">/MO</p>
        </div>
        <ul className="grid gap-3 text-md text-muted-foreground w-fit  ">
          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Unlimited Posts
          </li>
          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Unlimited Users
          </li>

          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Custom domain
          </li>
          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Dashboard Analytics
          </li>
          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Access to Discord
          </li>
          <li className="flex items-center">
            <MdCheck className="mr-2 h-4 w-4" /> Premium Support
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
          Get Started
        </Link>
      </div>
    </div>
  );
};

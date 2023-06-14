"use client";

import { Product } from "@/types";
import Plans from "@/components/plans";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/context/user-auth";
// async function getPlans(): Promise<Product[]> {
//   const res = await fetch(`${siteConfig.url}/api/plans`, { cache: "no-cache" });
//   const { productsArray } = await res.json();
//   return productsArray;
// }

export default function Plan() {
  // const plan = await getPlans();
  const { currentUser } = useAuth()!;

  return (
    <div className="container flex flex-col items-center  gap-6 py-8 min-h-screen bg-background border border-background ">
      {/* <div className="mx-auto flex items-center flex-col gap-4 w-full">
        <h2 className="font-heading text-2xl leading-[1.1] sm:text-3xl md:text-6xl">
          Choose your plan
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          7 day free trial. No credit card required.
        </p>
      </div> */}
      <Plans
        currentUser={currentUser}
        cancel_url="settings/upgrade"
        success_url="dashboard"
      />
    </div>
  );
}

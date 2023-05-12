import Link from "next/link";
import { cn, formatMoney } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Product } from "@/types";
import Plans from "./Plans";
import Stripe from "stripe";
import stripe from "@/stripe/stripeServer";

async function getPlans(): Promise<Product[]> {
  // const res = await fetch("http://localhost:3000/api/plans");
  // const { productsArray } = await res.json();
  const dummyData = [
    {
      id: "prod_NsPgipXnz61jAR",
      name: "Premium",
      description: "",
      monthly_price: {
        id: "price_1N6erTEewcpAM4MfvFFQC4no",
        unit_amount: 7900,
      },
      annual_price: {
        id: "price_1N6exkEewcpAM4Mfptccq7sK",
        unit_amount: 58800,
      },
      features: [
        "1 User",
        "1 GB Storage",
        "Email Support",
        "Help Center Access",
      ],
    },
    {
      id: "prod_NsPgx3fbEtgp1i",
      name: "Standard",
      description: "",
      monthly_price: {
        id: "price_1N6eqvEewcpAM4Mfq7Ee3orH",
        unit_amount: 4900,
      },
      annual_price: {
        id: "price_1N6ewwEewcpAM4MfHvcbQ0qE",
        unit_amount: 36000,
      },
      features: [
        "1 User",
        "1 GB Storage",
        "Email Support",
        "Help Center Access",
      ],
    },
    {
      id: "prod_NsPejSOm20kcO8",
      name: "Base",
      description: "",
      monthly_price: {
        id: "price_1N6ep6EewcpAM4MfyFL95phK",
        unit_amount: 2900,
      },
      annual_price: {
        id: "price_1N6et6EewcpAM4MfshZRFOwV",
        unit_amount: 22800,
      },
      features: [
        "1 User",
        "1 GB Storage",
        "Email Support",
        "Help Center Access",
      ],
    },
  ];
  // return productsArray;
  return dummyData;
}

export default async function Plan() {
  const plan = await getPlans();

  return (
    <div className="container flex flex-col items-center  gap-6 py-8 min-h-screen bg-background border border-background ">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-fit items-center flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-2xl leading-[1.1] sm:text-3xl md:text-6xl">
          Choose your plan
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          7 day free trial. No credit card required.
        </p>
      </div>
      <Plans plans={plan} />
    </div>
  );
}

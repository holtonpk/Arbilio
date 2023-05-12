import Link from "next/link";
import { cn, formatMoney } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Product } from "@/types";
import Plans from "./Plans";
import Stripe from "stripe";
import stripe from "@/stripe/stripeServer";

export async function getPlans(): Promise<Product[]> {
  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ["data.product"],
  });

  const productsObject: Record<string, Product> = prices.data.reduce(
    (accumulator: Record<string, Product>, price: Stripe.Price) => {
      const product = price.product as Stripe.Product;
      if (product.active) {
        if (!accumulator[product.id]) {
          accumulator[product.id] = {
            id: product.id,
            name: product.name || "",
            description: product.description || "",
            monthly_price: { id: "", unit_amount: 0 },
            annual_price: { id: "", unit_amount: 0 },
            features: [
              "1 User",
              "1 GB Storage",
              "Email Support",
              "Help Center Access",
            ],
          };
        }
        if (price.recurring && price.recurring.interval === "month") {
          accumulator[product.id].monthly_price = {
            id: price.id,
            unit_amount: price.unit_amount || 0,
          };
        } else if (price.recurring && price.recurring.interval === "year") {
          accumulator[product.id].annual_price = {
            id: price.id,
            unit_amount: price.unit_amount || 0,
          };
        }
      }
      return accumulator;
    },
    {} as Record<string, Product> // assert initialValue as Record<string, Product>
  );

  // Convert the products object back into an array
  const productsArray: Product[] = Object.values(productsObject);

  return productsArray;
}

export default async function PricingPage() {
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

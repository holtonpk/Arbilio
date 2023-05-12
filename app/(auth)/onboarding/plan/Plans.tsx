"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { MdCheck } from "react-icons/md";
import { Icons } from "@/components/icons";
import { Product } from "@/types";
import { createCheckoutSession } from "@/stripe/createCheckoutSession";
import { useAuth } from "@/context/Auth";
import { Button } from "@/components/ui/button";

interface PlansProps {
  plans: Product[];
}

type PriceType = "monthly_price" | "annual_price";

const Plans = ({ plans }: PlansProps) => {
  const [priceType, setPriceType] = useState<PriceType>("monthly_price");

  const changePriceType = () => {
    if (priceType == "monthly_price") {
      setPriceType("annual_price");
    } else {
      setPriceType("monthly_price");
    }
  };

  const mostPopularIndex = 1;

  const orderedPlans = plans.sort((a, b) => {
    // Assuming both products always have a monthly_price. If not, you need to add checks.
    return a[priceType].unit_amount - b[priceType].unit_amount;
  });

  return (
    <>
      <div className="flex items-center gap-3">
        <p
          className={`${
            priceType == "monthly_price"
              ? "text-primary"
              : "text-muted-foreground"
          } font-bold`}
        >
          Monthly
        </p>
        <Switch
          checked={priceType == "annual_price"}
          onChange={changePriceType}
          className={`${priceType == "annual_price" ? "bg-muted" : "bg-muted"}
            relative inline-flex h-[32px] border-border w-[64px] shrink-0 cursor-pointer rounded-full border-2  transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span
            aria-hidden="true"
            className={`${
              priceType == "annual_price" ? "translate-x-8" : "translate-x-0"
            }
              pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-primary shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <div
          className={`${
            priceType == "annual_price"
              ? "text-primary"
              : "text-muted-foreground"
          } font-bold flex items-center gap-3 relative`}
        >
          Yearly
          <div className=" text-primary text-[12px] border border-primary whitespace-nowrap py-1 rounded-full px-4 absolute -right-2 translate-x-full">
            Save 40%
          </div>
        </div>
      </div>
      <div className="grid  md:grid-cols-3 gap-6 md:gap-4 w-[80%] h-fit">
        {orderedPlans.map((plan: Product, i) => (
          <PricingCard
            key={i}
            plan={plan}
            priceType={priceType}
            mostPopular={i == mostPopularIndex}
          />
        ))}
      </div>
    </>
  );
};

interface PricingCardProps {
  plan: Product;
  priceType: PriceType;
  mostPopular?: boolean;
}

const PricingCard = ({ plan, priceType, mostPopular }: PricingCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth()!;
  const price = plan[priceType];

  const selectPlan = async () => {
    if (!currentUser || !price) return;
    setIsLoading(true);
    await createCheckoutSession(
      currentUser?.uid,
      price?.id,
      "http://localhost:3000/dashboard",
      "http://localhost:3000/onboarding/register"
    );
  };

  return (
    <div
      className={`flex flex-col items-center justify-between relative overflow-hidden  gap-6 rounded-lg border w-full p-8  h-fit 
      ${
        mostPopular
          ? "bg-muted pt-16 md:h-[540px]"
          : "bg-transparent md:h-[500px] md:translate-y-10"
      }
      `}
    >
      {mostPopular && (
        <div className="w-full h-10 bg-primary absolute top-0 left-0 flex justify-center items-center text-background">
          Most popular
        </div>
      )}
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold sm:text-2xl w-fit ">
            {plan.name + " Plan"}
          </h3>
          <div className="flex flex-row items-center w-fit">
            <h4 className="text-7xl font-bold flex items-center">
              $
              {priceType == "annual_price"
                ? price.unit_amount / 100 / 12
                : price.unit_amount / 100}
            </h4>
            <p className="text-sm font-medium text-muted-foreground">/MO</p>
          </div>
          {priceType == "annual_price" && (
            <>
              <p className="text-muted-foreground">{`$${
                price?.unit_amount / 100
              } billed annually`}</p>
              <p className=" primary border p-2 mt-2 rounded-md">{`Save $${Math.round(
                (plan.monthly_price?.unit_amount / 100) * 12 -
                  plan.annual_price?.unit_amount / 100
              )}`}</p>
            </>
          )}
        </div>
        <ul className="grid gap-3   text-md text-muted-foreground w-fit  ">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <MdCheck className="mr-2 h-4 w-4" /> {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <Button onClick={selectPlan} variant="default">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Plans;

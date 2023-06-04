"use client";
import { useMemo, useState } from "react";
import Confetti from "react-dom-confetti";
import { Icons } from "@/components/icons";
import Switch from "@/components/ui/switch";
import Tooltip from "@/components/ui/tooltip";
import { Product } from "@/types";
import { useAuth } from "@/context/Auth";
import { siteConfig } from "@/config/site";
import { createCheckoutSession } from "@/stripe/createCheckoutSession";
import { Button } from "@/components/ui/button";

const Pricing = ({ plans }: { plans: Product[] }) => {
  console.log("plans", plans);
  const [annualBilling, setAnnualBilling] = useState(true);
  const period = useMemo(
    () => (annualBilling ? "monthly_price" : "annual_price"),
    [annualBilling]
  );

  const orderedPlans = plans.sort((a, b) => {
    // Assuming both products always have a monthly_price. If not, you need to add checks.
    return a[period].unit_amount - b[period].unit_amount;
  });

  return (
    <div className=" text-center z-20">
      <div id="pricing" className="mx-auto my-10 sm:max-w-lg">
        <h2 className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
          Simple,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            affordable
          </span>{" "}
          pricing.
        </h2>
        {/* <p className="mt-5 text-primary sm:text-lg">
          Shorten your links without breaking your bank. <br />
          Start for free, no credit card required.
        </p> */}
      </div>

      <div className="relative mx-auto mb-14 flex max-w-fit items-center space-x-2">
        <p className="text-muted-foreground">Billed Monthly</p>
        <Confetti
          active={period === "annual_price"}
          config={{ elementCount: 200, spread: 90 }}
        />
        <Switch
          fn={setAnnualBilling}
          checked={annualBilling}
          trackDimensions="h-6 w-12"
          thumbDimensions="h-5 w-5"
          thumbTranslate="translate-x-6"
        />
        <p className="text-muted-foreground">Billed Annually</p>
        <span className="absolute -right-12 -top-8 rounded-full bg-purple-200 px-3 py-1 text-sm text-purple-700 sm:-right-[9.5rem] sm:-top-2">
          🎁 2 months FREE
        </span>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {orderedPlans.map((plan, i) => {
          return (
            <PlanCard key={i} plan={plan} popular={i == 1} period={period} />
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;

interface PlanCardProps {
  plan: Product;
  popular: boolean;
  period: "annual_price" | "monthly_price";
}

const PlanCard = ({ plan, popular, period }: PlanCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, userPlan } = useAuth()!;

  const price = plan[period];
  console.log("plan ===>", plan);

  const selectPlan = async () => {
    console.log("price ===>", price);
    if (!currentUser || !price) return;
    setIsLoading(true);
    await createCheckoutSession(
      currentUser?.uid,
      price?.id,
      `${siteConfig.url}/dashboard`,
      `${siteConfig.url}/onboarding/register`
    );
  };

  return (
    <div
      key={plan.id}
      className={`relative rounded-2xl bg-background ${
        popular ? "border-2 border-blue-600 shadow-blue-200" : "border"
      } shadow-lg`}
    >
      {popular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
          Popular
        </div>
      )}

      <div className="p-5">
        <h3 className="my-3 text-center font-display text-3xl font-bold">
          {plan.name}
        </h3>
        <p className="text-gray-500">{"this need to be a tagline"}</p>
        <p className="my-5 font-display text-6xl font-semibold">
          $
          {period === "annual_price"
            ? plan.annual_price.unit_amount / 100 / 12
            : plan.monthly_price.unit_amount / 100}
        </p>
        <p className="text-gray-500">
          per {period === "annual_price" ? "month, billed annually" : "month"}
        </p>
      </div>
      <div className="flex h-20 items-center justify-center border-b border-t border-border bg-muted/20">
        <div className="flex items-center">
          <p className="text-primary">Up to ? link clicks/mo</p>
          <Tooltip content="If you exceed your monthly usage, your existing links will still work, but you need to upgrade to view their stats/add more links. Link clicks are shared across all projects.">
            <div className="flex h-4 w-8 justify-center">
              <Icons.helpCircle className="h-4 w-4 text-gray-600" />
            </div>
          </Tooltip>
        </div>
      </div>
      <ul className="my-10 space-y-5 px-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex space-x-5">
            <div className="flex-shrink-0">
              {feature.negative ? (
                <Icons.xCircle className="h-6 w-6 text-muted-foreground" />
              ) : (
                <Icons.checkCircle className="h-6 w-6 text-green-500" />
              )}
            </div>
            {feature.footnote ? (
              <div className="flex items-center">
                <p
                  className={
                    feature.negative ? "text-muted-foreground" : "text-primary"
                  }
                >
                  {feature.text}
                </p>
                <Tooltip content={feature.footnote}>
                  <div className="flex h-4 w-8 justify-center">
                    <Icons.helpCircle className="h-4 w-4 text-gray-600" />
                  </div>
                </Tooltip>
              </div>
            ) : (
              <p
                className={
                  feature.negative ? "text-muted-foreground" : "text-primary"
                }
              >
                {feature.text}
              </p>
            )}
          </li>
        ))}
      </ul>
      <div className="border-t border-border" />
      <div className="p-5">
        <Button
          onClick={selectPlan}
          className={`${
            popular
              ? "bg-theme-blue border-none hover:bg-primary text-white hover:text-theme-blue"
              : ""
          } w-full`}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Get Started
        </Button>
      </div>
    </div>
  );
};

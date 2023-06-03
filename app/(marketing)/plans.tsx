"use client";
import { useMemo, useState } from "react";
import Confetti from "react-dom-confetti";
import { Icons } from "@/components/icons";
import Switch from "@/components/ui/switch";
import Tooltip from "@/components/ui/tooltip";
import { Product } from "@/types";
import { LinkButton } from "@/components/ui/link";

const plans = [
  {
    id: "prod_NsPgipXnz61jAR",
    name: "Premium",
    description: "",
    monthly_price: { id: "price_1N6erTEewcpAM4MfvFFQC4no", unit_amount: 7900 },
    annual_price: { id: "price_1N6exkEewcpAM4Mfptccq7sK", unit_amount: 58800 },
    firebaseRole: "premium",
    features: [
      { text: "Unlimited users" },
      { text: "Unlimited branded links" },
      { text: "Unlimited custom domains" },
      { text: "Free SSL certificates" },
      {
        text: "Advanced link features",
        footnote:
          "Password protection, link expiration, device targeting, custom social media cards, etc.",
      },
      {
        text: "Root domain redirect",
        footnote:
          "Redirect vistors that land on the root of your domain (e.g. yourdomain.com) to a page of your choice.",
        negative: true,
      },
      { text: "Custom QR Code Logo", negative: true },
    ],
  },
  {
    id: "prod_NsPgx3fbEtgp1i",
    name: "Standard",
    description: "",
    monthly_price: { id: "price_1N6eqvEewcpAM4Mfq7Ee3orH", unit_amount: 4900 },
    annual_price: { id: "price_1N6ewwEewcpAM4MfHvcbQ0qE", unit_amount: 36000 },
    firebaseRole: "standard",
    features: [
      { text: "Unlimited users" },
      { text: "Unlimited branded links" },
      { text: "Unlimited custom domains" },
      { text: "Free SSL certificates" },
      {
        text: "Advanced link features",
        footnote:
          "Password protection, link expiration, device targeting, custom social media cards, etc.",
      },
      {
        text: "Root domain redirect",
        footnote:
          "Redirect vistors that land on the root of your domain (e.g. yourdomain.com) to a page of your choice.",
        negative: true,
      },
      { text: "Custom QR Code Logo", negative: true },
    ],
  },
  {
    id: "prod_NsPejSOm20kcO8",
    name: "Base",
    description: "",
    monthly_price: { id: "price_1N6ep6EewcpAM4MfyFL95phK", unit_amount: 2900 },
    annual_price: { id: "price_1N6et6EewcpAM4MfshZRFOwV", unit_amount: 22800 },
    firebaseRole: "base",
    features: [
      { text: "Unlimited users" },
      { text: "Unlimited branded links" },
      { text: "Unlimited custom domains" },
      { text: "Free SSL certificates" },
      {
        text: "Advanced link features",
        footnote:
          "Password protection, link expiration, device targeting, custom social media cards, etc.",
      },
      {
        text: "Root domain redirect",
        footnote:
          "Redirect vistors that land on the root of your domain (e.g. yourdomain.com) to a page of your choice.",
        negative: true,
      },
      { text: "Custom QR Code Logo", negative: true },
    ],
  },
];

const Pricing = () => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const period = useMemo(
    () => (annualBilling ? "monthly_price" : "annual_price"),
    [annualBilling]
  );

  const orderedPlans = plans.sort((a, b) => {
    return a[period].unit_amount - b[period].unit_amount;
  });

  return (
    <div className=" text-center">
      <div id="pricing" className="mx-auto my-10 sm:max-w-lg">
        <h2 className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
          Simple,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            affordable
          </span>{" "}
          pricing.
        </h2>
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
  return (
    <div
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
        <LinkButton
          href={"/onboarding/register"}
          className={`${
            popular
              ? "bg-theme-blue border-none hover:bg-primary text-white hover:text-theme-blue"
              : ""
          } w-full`}
        >
          Get Started
        </LinkButton>
      </div>
    </div>
  );
};

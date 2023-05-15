import React from "react";
import HeroHeader from "@/app/(marketing)/components/hero-header";
import { Icons } from "@/components/icons";
const Analyze = () => {
  return (
    <section id="features" className="flex flex-col items-center">
      <HeroHeader
        gradient="bg-gradient-to-r from-green-400 to-blue-500"
        lineColor="md:to-accent md:from-green-400 from-green-400 "
        lineHeight="h-[250px]"
        number="2"
        title="Analyze"
        subtitle="Leverage the power of our tools"
        description="This project is an experiment to see how a modern app, with features like auth, subscriptions, API routes, and static pages would work in Next.js 13 app dir."
      />

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-4">
        {features.map((feature, indx) => (
          <FeatureCard key={indx} data={feature} />
        ))}
      </div>
    </section>
  );
};

export default Analyze;

interface FeatureCardProps {
  data: {
    name: string;
    description: string;
    icon: keyof typeof Icons;
  };
}
export const FeatureCard = ({ data }: FeatureCardProps) => {
  const Icon = Icons[data.icon];

  return (
    <div className="relative overflow-hidden rounded-lg  p-2">
      <div className="flex h-fit flex-col justify-between rounded-md ">
        <div className="bg-muted p-3 flex items-center justify-center w-fit h-fit mb-2 rounded-md border-accent border ">
          <Icon className="text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold">{data.name}</h3>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    name: "Account Database",
    description:
      "Leverage our comprehensive database featuring over 500 active sellers to perform detailed market analysis and glean valuable insights.",
    icon: "accounts" as keyof typeof Icons,
  },
  {
    name: "Top Account",
    description:
      "Effortlessly access a clear, daily ranking of top-performing accounts to stay updated with leading market players and their strategies.",
    icon: "rank" as keyof typeof Icons,
  },
  {
    name: "Account Tracker",
    description:
      "Utilize our Account Tracker to monitor account growth, analyze trend patterns, and make informed decisions based on this data.",
    icon: "crosshair" as keyof typeof Icons,
  },
  {
    name: "Product Database",
    description:
      "Harness our extensive Product Database to identify top-selling items and understand the dynamics behind their success.",
    icon: "database" as keyof typeof Icons,
  },
  {
    name: "Store Integration",
    description:
      "Enjoy a hassle-free experience of posting products to your store with our sophisticated, user-friendly store integration tools.",
    icon: "store" as keyof typeof Icons,
  },
  {
    name: "Top Products",
    description:
      "Discover trending products, track their performance, and gain a competitive edge by understanding the factors contributing to their popularity.",
    icon: "analytics" as keyof typeof Icons,
  },
];

import React from "react";
import HeroHeader from "@/app/(marketing)/hero-header";
import { Icons } from "@/components/icons";
import GlobeClient from "@/app/(marketing)/globe";

const Analyze = () => {
  return (
    <section id="features" className="flex flex-col items-center">
      <HeroHeader
        gradient="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400"
        lineColor="md:to-accent md:from-blue-600 from-sky-500 "
        lineHeight="h-[250px]"
        number="2"
        title="Analyze"
        subtitle="Leverage the power of our tools"
        description="Unleash the potential of TikDrop.io's robust tools designed to empower your dropshipping business. They offer streamlined solutions for product discovery, video creation, and revenue enhancement, making your path to success both efficient and profitable."
      />
      <div className="grid grid-cols-2 w-full px-4 md:px-0 md:w-[80%] gap-4 md:gap-20 pt-[180px] relative ">
        <div className="absolute md:flex items-center flex-col h-full hidden md:gap-[1px]  top-0 left-1/2 -translate-x-1/2">
          <span className="w-[1px] h-[120px] bg-gradient-to-t  from-accent "></span>
          <span className="h-4 w-4 border rounded-full border-accent " />
          <span className="w-[1px] h-[74px] border border-dashed border-accent " />
          <span className="h-4 w-4 border rounded-full border-accent" />
          <span className="w-[1px] h-[74px] border border-dashed border-accent " />
          <span className="h-4 w-4 border rounded-full border-accent" />
          <span className="w-[1px] h-[74px] border border-dashed border-accent " />
          <span className="h-4 w-4 border rounded-full border-accent" />
          <span className="w-[1px] h-[74px] border border-dashed border-accent " />
          <span className="h-4 w-4 border rounded-full border-accent" />
          <span className="w-[1px] h-[74px] border border-dashed border-accent " />
          <span className="h-4 w-4 border rounded-full border-accent" />
          <span className="w-[1px] h-[150px] bg-accent border-accent " />
        </div>
        <div className="absolute md:hidden flex items-center flex-col h-full  md:gap-[1px]  top-0 left-1/2 -translate-x-1/2">
          <span className="w-[1px] h-[200px] bg-gradient-to-t  from-accent "></span>
          <span className="h-4 w-4 border rounded-full border-accent " />
          <span className="w-[1px] h-[276px] border border-dashed border-accent " />
          <span className="h-4 w-4 border rounded-full border-accent" />
          <span className="w-[1px] h-[276px] border border-dashed border-accent " />
          <span className="h-4 w-4 border rounded-full border-accent" />
          <span className="w-[1px] h-[250px] bg-accent border-accent " />
        </div>
        <div className=" grid w-full  md:w-[80%]   gap-4 md:gap-0   md:ml-auto">
          {features.slice(3, 6).map((feature, indx) => (
            <FeatureCardFlip key={indx} data={feature} />
          ))}
        </div>

        <div className=" grid justify-center gap-4 md:gap-0  md:w-[80%]  md:-translate-y-[90px] ">
          {features.slice(0, 3).map((feature, indx) => (
            <FeatureCard key={indx} data={feature} />
          ))}
        </div>
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
    <div className="relative overflow-hidden rounded-lg  h-[250px] md:p-2 md:h-[180px] ">
      <div className="flex h-fit flex-col items-center md:items-start justify-between rounded-md ">
        <div className="bg-muted p-3 flex items-center justify-center w-fit h-fit mb-2 rounded-md border-accent border ">
          <Icon className="text-muted-foreground" />
        </div>

        <h3 className="font-bold text-center text-xl md:text-left">
          {data.name}
        </h3>
        <p className="text-sm text-muted-foreground text-center  w-full md:text-left">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export const FeatureCardFlip = ({ data }: FeatureCardProps) => {
  const Icon = Icons[data.icon];

  return (
    <div className="relative overflow-hidden rounded-lg h-[250px] md:h-[180px] md:p-2">
      <div className="flex h-fit flex-col items-center md:items-end  justify-between rounded-md ">
        <div className="bg-muted p-3 flex items-center justify-center w-fit h-fit mb-2 rounded-md border-accent border ">
          <Icon className="text-muted-foreground" />
        </div>

        <h3 className="font-bold text-center text-xl md:text-right">
          {data.name}
        </h3>
        <p className="text-sm text-muted-foreground text-center w-[90%] md:w-full md:text-right">
          {data.description}
        </p>
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

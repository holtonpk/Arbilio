import React from "react";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

const features = [
  {
    name: "Account Database",
    description:
      "Leverage our comprehensive database featuring over 500 active sellers to perform detailed market analysis and glean valuable insights.",
    icon: "accounts" as keyof typeof Icons,
    href: "/accounts/account-database/demo",
  },
  {
    name: "Top Account",
    description:
      "Effortlessly access a clear, daily ranking of top-performing accounts to stay updated with leading market players and their strategies.",
    icon: "rank" as keyof typeof Icons,
    href: "/accounts/top-accounts",
  },
  {
    name: "Account Collections",
    description:
      "Utilize our Account Tracker to monitor account growth, analyze trend patterns, and make informed decisions based on this data.",
    icon: "crosshair" as keyof typeof Icons,
    href: "/accounts/account-collections",
  },
  {
    name: "Product Database",
    description:
      "Harness our extensive Product Database to identify top-selling items and understand the dynamics behind their success.",
    icon: "database" as keyof typeof Icons,
    href: "/products/product-database",
  },
  {
    name: "Product Tracker",
    description:
      "Discover trending products, track their performance, and gain a competitive edge by understanding the factors contributing to their popularity.",
    icon: "analytics" as keyof typeof Icons,
    href: "/products/product-tracker",
  },
];

const KeyFeatures = () => {
  return (
    <div className="flex flex-col flex-grow  pb-3 relative">
      <div className="grid md:grid-cols-3 gap-4 rounded-md flex-grow overflow-scroll ">
        {features.map((feature, i) => (
          <FeatureCard key={i} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;

const FeatureCard = ({
  name,
  description,
  icon,
  href,
}: {
  name: string;
  description: string;
  icon: keyof typeof Icons;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="flex  flex-col md:flex-row md:gap-4 p-4 group hover:bg-muted w-full md:w-fit rounded-md cursor-pointer border"
    >
      <FeatureIcon icon={icon} />

      <div className="flex flex-col">
        <h2 className="text-sm md:text-base ">{name}</h2>
        <p className="text-muted-foreground text-[12px] md:text-sm">
          {description}
        </p>
      </div>
    </Link>
  );
};

const FeatureIcon = ({ icon }: { icon: keyof typeof Icons }) => {
  const Icon = Icons[icon];
  return (
    <div className="bg-blue-500/30 bg-opacity-30 text-theme-blue aspect-square h-fit w-fit p-2 rounded-md flex items-center justify-center">
      <Icon className="md:h-6 md:w-6 h-4 w-4 " />
    </div>
  );
};

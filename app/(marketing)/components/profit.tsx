import React from "react";
import HeroHeader from "@/app/(marketing)/components/hero-header";

const Profit = () => {
  return (
    <section id="profit">
      <HeroHeader
        gradient="bg-gradient-to-r from-red-400 to-yellow-500"
        lineColor="from-red-400"
        number="3"
        title="Profit"
        subtitle="Profit from the best deals"
        description="This project is an experiment to see how a modern app, with features like auth, subscriptions, API routes, and static pages would work in Next.js 13 app dir."
      />
    </section>
  );
};

export default Profit;

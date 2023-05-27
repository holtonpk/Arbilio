import React from "react";
import HeroHeader from "@/app/(marketing)/components/hero-header";
import GlobeClient from "@/components/globe";
const Profit = () => {
  return (
    <section id="profit">
      <HeroHeader
        gradient="bg-gradient-to-r from-red-400 to-yellow-500"
        lineColor="bg-gradient-to-t to-accent from-red-400 "
        number="3"
        title="Profit"
        subtitle="Profit from the best deals"
        description="With TikDrop.io, reap the benefits of the finest deals and engage in profitable arbitrage. Our platform opens up access to top-quality products at competitive prices, creating lucrative opportunities for optimal margins."
      />
      <div className="grid grid-cols-[1fr_60%]">
        <div></div>
        <GlobeClient />
      </div>
    </section>
  );
};

export default Profit;

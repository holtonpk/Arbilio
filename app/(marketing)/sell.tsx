import React from "react";
import HeroHeader from "@/app/(marketing)/hero-header";
import GlobeClient from "@/app/(marketing)/globe";
const Sell = () => {
  return (
    <section id="profit">
      <HeroHeader
        gradient="bg-gradient-to-r to-amber-400 via-orange-500 from-red-500"
        lineColor="bg-gradient-to-t to-accent from-orange-500 "
        number="3"
        title="Sell"
        subtitle="Start Selling In A Rapidly Growing Industry
"
        description=""
      />
      <div className="w-[200%] relative -translate-x-1/2 left-1/2 md:translate-x-0 md:w-[90%] md:mx-auto h-fit">
        <div className="w-full relative   h-fit  ">
          <GlobeClient />
        </div>
      </div>
    </section>
  );
};

export default Sell;

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
      <div className="w-[90%] mx-auto ">
        <div className="w-full relative  overflow-hidden ">
          {/* <div className="absolute  h-[70%] bottom-0 w-full z-10 bg-gradient-to-t from-background to-background/10  "></div> */}
          <GlobeClient />
        </div>
      </div>
    </section>
  );
};

export default Sell;

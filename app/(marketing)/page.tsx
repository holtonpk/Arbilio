"use client";
import HeroText from "@/app/(marketing)/hero-text";
import HeroHeader from "@/app/(marketing)/hero-header";
import Discover from "@/app/(marketing)//discover";
import Analyze from "@/app/(marketing)/analyze";
import Sell from "@/app/(marketing)/sell";
import Testimonials from "@/app/(marketing)/testimonials";
import Background from "@/components/background";
import Pricing from "@/app/(marketing)/plans";
export default async function IndexPage() {
  return (
    <>
      <div className="container">
        <section className="space-y-6 pb-8 pt-6 md:pb-12  ">
          <HeroText />
        </section>
        <Testimonials />
        <p className="text-muted-foreground text-md w-fit mx-auto uppercase font-bold mb-3">
          explore the power of TikDop.io
        </p>
        <Discover />
        <Analyze />
        <Sell />
        <Pricing />
      </div>
    </>
  );
}
x;

"use client";
import HeroText from "@/app/(marketing)/components/hero-text";
import HeroHeader from "@/app/(marketing)/components/hero-header";
import Discover from "@/app/(marketing)/components/discover";
import Analyze from "@/app/(marketing)/components/analyze";
import Sell from "@/app/(marketing)/components/sell";
import Testimonials from "@/app/(marketing)/components/testimonials";
import Background from "@/components/background";
import Pricing from "@/app/(marketing)/components/plans";
export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12  ">
        <HeroText />
      </section>
      <Testimonials />
      <p className="text-muted-foreground text-md w-fit mx-auto uppercase font-bold mb-3">
        explore the power of TikDop.io
      </p>
      <div className="container">
        <Discover />
        <Analyze />
        <Sell />
        <Pricing />
      </div>
    </>
  );
}

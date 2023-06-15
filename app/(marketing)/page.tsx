import HeroText from "@/app/(marketing)/hero-text";
import HeroHeader from "@/app/(marketing)/hero-header";
import Discover from "@/app/(marketing)//discover";
import Analyze from "@/app/(marketing)/analyze";
import Sell from "@/app/(marketing)/sell";
import Testimonials from "@/app/(marketing)/testimonials";
import Background from "@/components/background";
import Pricing from "@/components/plans";
import FAQ from "@/app/(marketing)/pricing/faq";
import { constructMetadata } from "@/lib/utils";
import Features from "@/app/(marketing)/features";
import Stats from "@/app/(marketing)/stats";
import { siteConfig } from "@/config/site";
export const metadata = constructMetadata({});

export default async function IndexPage() {
  return (
    <div className="pb-10">
      <div className="container">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 container ">
          <HeroText />
        </section>
        {/* <Testimonials /> */}
        {/* <p className="text-muted-foreground text-md w-fit mx-auto uppercase font-bold mb-3">
          explore the power of {siteConfig.name}
        </p> */}
        {/* <Discover /> */}
      </div>
      <Analyze />
      <Stats />
      <div className="container">
        <Features />
        <Sell />
      </div>
      <div className=" text-center mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div id="pricing" className="mx-auto mb-10 sm:max-w-lg">
          <h2 className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
            Simple,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              transparent
            </span>{" "}
            pricing.
          </h2>
        </div>
      </div>
      <Pricing />
      <FAQ />
    </div>
  );
}

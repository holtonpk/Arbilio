import { Product } from "@/types";
// import Plans from "./view-pricing";
import Pricing from "./plans";
import { siteConfig } from "@/config/site";

async function getPlans(): Promise<Product[]> {
  const res = await fetch(`${siteConfig.url}/api/plans`, { cache: "no-cache" });
  const { productsArray } = await res.json();
  return productsArray;
}

export default async function Plan() {
  const plan = await getPlans();

  return (
    <div className="container flex flex-col items-center  min-h-screen  border border-background ">
      <Pricing plans={plan} />
    </div>
  );
}

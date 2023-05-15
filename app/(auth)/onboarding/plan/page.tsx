import { Product } from "@/types";
import Plans from "./Plans";
import { siteConfig } from "@/config/site";
import LogoutButton from "@/components/logout-button";
import { Icons } from "@/components/icons";
async function getPlans(): Promise<Product[]> {
  const res = await fetch(`${siteConfig.url}/api/plans`);
  const { productsArray } = await res.json();
  return productsArray;
}

export default async function Plan() {
  const plan = await getPlans();

  return (
    <div className="container flex flex-col items-center  gap-6 py-8 min-h-screen bg-background border border-background ">
      <LogoutButton variant="outline" className="absolute top-4 right-4">
        <Icons.logout className="mr-2 h-4 w-4" />
        Logout
      </LogoutButton>

      <div className="mx-auto flex w-fit items-center flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-2xl leading-[1.1] sm:text-3xl md:text-6xl">
          Choose your plan
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          7 day free trial. No credit card required.
        </p>
      </div>
      <Plans plans={plan} />
    </div>
  );
}

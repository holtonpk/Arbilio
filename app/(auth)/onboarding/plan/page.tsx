import { Product } from "@/types";
import Plans from "@/components/plans";
import { siteConfig } from "@/config/site";
import LogoutButton from "@/components/buttons/logout-button";
import { Icons } from "@/components/icons";
import Background from "@/components/background";
async function getPlans(): Promise<Product[]> {
  const res = await fetch(`${siteConfig.url}/api/plans`, { cache: "no-cache" });
  const { productsArray } = await res.json();
  return productsArray;
}

export default async function Plan() {
  const plans = await getPlans();

  return (
    <div className="container flex flex-col items-center  gap-6 py-8 min-h-screen border border-background ">
      <LogoutButton variant="outline" className="absolute top-4 right-4">
        <Icons.logout className="mr-2 h-4 w-4" />
        Logout
      </LogoutButton>
      <Plans plans={plans} />
      <Background />
    </div>
  );
}

import { Product } from "@/types";
import LogoutButton from "@/components/buttons/logout-button";
import { Icons } from "@/components/icons";
import Background from "@/components/background";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/context/user-auth";
import PlanLayout from "./plan";

export default async function Plan() {
  return (
    <div className="container flex flex-col items-center  gap-6 py-8 min-h-screen border border-background ">
      <LogoutButton
        variant="outline"
        className="absolute top-4 right-4 md:block hidden"
      >
        <Icons.logout className="mr-2 h-4 w-4" />
        Logout
      </LogoutButton>
      <div id="pricing" className="mx-auto mt-10 sm:max-w-lg">
        <h2 className="font-display text-center text-2xl md:text-4xl font-extrabold text-primary sm:text-5xl">
          Simple,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            transparent
          </span>{" "}
          <br className="md:hidden block" />
          pricing.
        </h2>
      </div>
      <PlanLayout />
      <Background />
    </div>
  );
}

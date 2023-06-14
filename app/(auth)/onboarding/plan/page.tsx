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
      <LogoutButton variant="outline" className="absolute top-4 right-4">
        <Icons.logout className="mr-2 h-4 w-4" />
        Logout
      </LogoutButton>
      <div className=" text-center mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div id="pricing" className="mx-auto sm:max-w-lg">
          <h2 className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
            Choose your plan
            {/* <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              transparent
            </span>{" "} */}
          </h2>
        </div>
      </div>
      <PlanLayout />
      <Background />
    </div>
  );
}

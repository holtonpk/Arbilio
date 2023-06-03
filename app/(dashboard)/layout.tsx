import React, { ReactElement } from "react";

import { AuthProvider } from "@/context/Auth";
import ProtectedRoutes from "./protect-routes";
import DashboardNav from "@/components/nav/dashboard-nav";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/toaster";
import { UserCollectionProvider } from "@/context/user-collections";
import UserSubscribed from "./is-user-subscribed";
import { MobileDashboardNav } from "@/components/nav/mobile-dashboard-nav";
import { LinkButton } from "@/components/ui/link";
import { UserProductTrackProvider } from "@/context/user-product-track";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <AuthProvider>
      <ProtectedRoutes>
        <UserSubscribed>
          <UserCollectionProvider>
            <UserProductTrackProvider>
              <>
                <Toaster />
                <header>
                  <DashboardNav />
                  <MobileDashboardNav />
                </header>
                <div className="w-full h-fit hidden md:flex bg-gradient-to-r text-white from-indigo-500 via-purple-500 to-pink-500  items-center gap-3 justify-center p-1">
                  Your trial expires in 11 days. To maintain access to premium
                  features, upgrade to Pro.
                  <LinkButton
                    href="/settings/upgrade"
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white hover:text-black "
                  >
                    Upgrade
                  </LinkButton>
                </div>
                <div className="min-h-screen mt-20 md:mt-0  max-w-screen  overflow-hidden ">
                  <main className=" relative w-full pt-6   overflow-auto  min-h-[80vh] ">
                    {children}
                  </main>
                  <div className="col-start-1 col-end-3 ">
                    <SiteFooter />
                  </div>
                </div>
              </>
            </UserProductTrackProvider>
          </UserCollectionProvider>
        </UserSubscribed>
      </ProtectedRoutes>
    </AuthProvider>
  );
}

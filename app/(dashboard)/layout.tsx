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
import { UpSaleBanner } from "@/components/upsale-banner";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
  title: `Dashboard - ${siteConfig.name}`,
});

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
                <UpSaleBanner />
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

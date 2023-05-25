import React, { ReactElement } from "react";
import Navbar from "@/components/nav/side-nav";
import { AuthProvider } from "@/context/Auth";
import ProtectedRoutes from "./protect-routes";
import DashboardNav from "@/components/nav/dashboard-nav";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/toaster";
import { UserCollectionProvider } from "@/context/user-collections";
import UserSubscribed from "./is-user-subscribed";
import { MobileDashboardNav } from "@/components/nav/mobile-dashboard-nav";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <AuthProvider>
      <ProtectedRoutes>
        <UserSubscribed>
          <UserCollectionProvider>
            <>
              <Toaster />
              <header>
                <DashboardNav />
                <MobileDashboardNav />
              </header>
              <div className="min-h-screen mt-20 md:mt-0  max-w-screen  overflow-hidden ">
                <main className=" relative w-full pt-6   overflow-auto  min-h-[80vh] ">
                  {children}
                </main>
                <div className="col-start-1 col-end-3 ">
                  <SiteFooter />
                </div>
              </div>
            </>
          </UserCollectionProvider>
        </UserSubscribed>
      </ProtectedRoutes>
    </AuthProvider>
  );
}

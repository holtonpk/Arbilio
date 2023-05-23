import React, { ReactElement } from "react";
import Navbar from "@/components/nav/side-nav";
import { AuthProvider } from "@/context/Auth";
import ProtectedRoutes from "./protect-routes";
import { marketingConfig } from "@/config/marketing";
import { DashboardNav } from "@/components/dashboard-nav";
import { SiteFooter } from "@/components/site-footer";
import { AccountInfo } from "@/components/account-preview";
import { Toaster } from "@/components/ui/toaster";
import { UserCollectionProvider } from "@/context/user-collections";
import UserSubscribed from "./is-user-subscribed";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <AuthProvider>
      <ProtectedRoutes>
        <UserSubscribed>
          <UserCollectionProvider>
            <>
              <Toaster />
              <div className="p-2 md:container min-h-screen grid grid-cols-1 md:grid-cols-[250px_1fr] max-w-screen  overflow-hidden ">
                <header className="fixed w-screen  z-40 blurBack border-b top-0 left-0  col-start-1 col-end-3">
                  <div className="container flex h-20 items-center justify-between py-6 w-full">
                    <DashboardNav items={marketingConfig.mainNav} />
                    <div className="hidden md:block">
                      <AccountInfo />
                    </div>
                  </div>
                </header>
                <aside className=" fixed hidden container w-[250px] flex-col md:flex h-fit pt-24  top-0  col-start-1 ">
                  <Navbar />
                </aside>
                <main className=" col-start-1 col-end-2 relative max-w-full md:col-start-2  pt-24 md:container overflow-auto  min-h-[80vh] ">
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

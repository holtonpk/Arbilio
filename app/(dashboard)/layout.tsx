import React, { ReactElement } from "react";
import Navbar from "@/components/side-nav";
import { AuthProvider } from "@/context/Auth";
import ProtectedRoutes from "./protect-routes";
import { marketingConfig } from "@/config/marketing";
import { DashboardNav } from "@/components/dashboard-nav";
import { SiteFooter } from "@/components/site-footer";
import { AccountInfo } from "@/components/account-preview";
import { Toaster } from "@/components/ui/toaster";
import { UserCollectionProvider } from "@/context/user-collections";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <AuthProvider>
      <ProtectedRoutes>
        <UserCollectionProvider>
          <>
            <Toaster />
            <div className="p-2 md:container min-h-screen grid grid-cols-[250px_1fr]  ">
              <header className="fixed w-screen  z-40 blurBack border-b top-0 left-0  col-start-1 col-end-3">
                <div className="container flex h-20 items-center justify-between py-6 w-full">
                  <DashboardNav items={marketingConfig.mainNav} />
                  <div className="hidden md:block">
                    <AccountInfo />
                  </div>
                </div>
              </header>
              <span className="h-20" />
              <aside className="w-full hidden container flex-col md:flex pt-4 h-fit sticky top-20  col-start-1 ">
                <Navbar />
              </aside>
              <main className=" flex-1 col-start-1 col-end-3 relative  md:col-start-2 ">
                <div className="md:container grid flex-1 md:gap-12">
                  <main className="flex w-full flex-1 flex-col overflow-hidden min-h-[80vh]  dark:bg-transparent pt-4">
                    {children}
                  </main>
                </div>
              </main>
              <div className="col-start-1 col-end-3 ">
                <SiteFooter />
              </div>
            </div>
          </>
        </UserCollectionProvider>
      </ProtectedRoutes>
    </AuthProvider>
  );
}

import React, { ReactElement } from "react";
import Navbar from "@/components/nav/side-nav";
import { AuthProvider } from "@/context/Auth";
import ProtectedRoutes from "./protect-routes";
import { marketingConfig } from "@/config/marketing";
import DashboardNav from "@/components/nav-dashboard";
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
              <DashboardNav />
              <div className=" min-h-screen  max-w-screen  overflow-hidden ">
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

import React, { ReactElement } from "react";
import Navbar from "@/components/side-nav";
import { AuthProvider } from "@/context/Auth";
import ProtectedRoutes from "./protect-routes";
import { marketingConfig } from "@/config/marketing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MainNav } from "@/components/main-nav";
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
            <div className="flex min-h-screen flex-col">
              <header className="container z-40 bg-background border-b">
                <div className="flex h-20 items-center justify-between py-6">
                  <MainNav items={marketingConfig.mainNav} />
                  <AccountInfo />
                </div>
              </header>
              <main className="flex-1">
                {/* <div className="flex flex-grow b-b">
              <Navbar />
              <div className="flex-grow  overflow-hidden w-full flex flex-col   min-h-screen bg-background">
                {children}
              </div>
            </div> */}
                <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                  <aside className="hidden w-[200px] flex-col md:flex pt-4 h-fit ">
                    <Navbar />
                  </aside>
                  <main className="flex w-full flex-1 flex-col overflow-hidden min-h-[80vh] bg-slate-50 dark:bg-transparent p-4">
                    {children}
                  </main>
                </div>
              </main>
              <SiteFooter />
            </div>
          </>
        </UserCollectionProvider>
      </ProtectedRoutes>
    </AuthProvider>
  );
}

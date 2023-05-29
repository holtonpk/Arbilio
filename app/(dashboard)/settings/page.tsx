"use client";
import React, { useState } from "react";
import Profile from "@/app/(dashboard)/settings/profile";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const stripe = require("stripe")(
    "sk_test_51KsFpgEewcpAM4MfqUhXKeEnFfdHkN0Btxdxi4pLQzB45cOWyGtk1ujQsZWfT5RIOcijIZqyIrUpeVfJtGxHuMmz00rGEWP0qm"
  );
  const ManageSub = async () => {
    setIsLoading(true);
    const session = await stripe.billingPortal.sessions.create({
      customer: "cus_Ns5BZPlhGnvG7w",
      return_url: `${siteConfig.url}/settings`,
    });
    router.push(session.url);
  };
  return (
    <>
      <PageHeader heading="Settings">
        <Button onClick={ManageSub} className="whitespace-nowrap mr-10">
          {isLoading ? (
            <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            <Icons.wallet className="mr-2 h-5 w-5" />
          )}
          Manage Subscription
        </Button>
      </PageHeader>
      <div className="w-full border-t">
        <div className="w-full container pt-8  flex flex-col min-h-screen items-center  ">
          <Profile />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;

"use client";
import React, { useState } from "react";
import Profile from "@/app/(dashboard)/settings/profile-settings";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/header";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/user-auth";
import { manageSubscription } from "@/stripe/createCheckoutSession";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { currentUser } = useAuth()!;

  const ManageSub = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    const manageLink = await manageSubscription(
      currentUser.stripeId,
      "settings"
    );
    router.push(manageLink);
    setIsLoading(false);
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

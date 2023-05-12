"use client";
import React, { useState } from "react";
import Profile from "./Profile";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
const SettingsPage = () => {
  const [tab, setTab] = useState<"billing" | "profile">("profile");

  return (
    <>
      <h1 className="text-3xl font-bold mb-3">Account Settings</h1>
      <div className="w-full flex flex-col overflow-scroll h-full gap-4 rounded-md ">
        {/* <SettingsNav tab={tab} setTab={setTab} /> */}
        <Profile />
        {/* {tab == "billing" && <Billing />} */}
      </div>
    </>
  );
};

export default SettingsPage;

const SettingsNav = ({ tab, setTab }: any) => {
  return (
    <div className="h-full flex w-full gap-2">
      <Button
        variant={tab == "profile" ? "secondary" : "outline"}
        onClick={() => setTab("profile")}
        className="gap-2 border"
      >
        <Icons.profile className="h-6 w-6" />
        My Profile
      </Button>
      <Button
        variant={tab == "billing" ? "secondary" : "outline"}
        onClick={() => setTab("billing")}
        className="gap-2 border"
      >
        <Icons.wallet className="h-6 w-6" />
        Billing
      </Button>
    </div>
  );
};

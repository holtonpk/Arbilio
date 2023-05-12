"use client";
import React, { useState } from "react";
import { MdPersonOutline } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import Profile from "./Profile";
import Billing from "./Billing";
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
        <MdPersonOutline className="h-6 w-6" />
        My Profile
      </Button>
      <Button
        variant={tab == "billing" ? "secondary" : "outline"}
        onClick={() => setTab("billing")}
        className="gap-2 border"
      >
        <IoWalletOutline className="h-6 w-6" />
        Billing
      </Button>
    </div>
  );
};

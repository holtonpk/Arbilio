"use client";
import React from "react";
import { useAuth } from "@/context/Auth";
import DashboardLayout from "@/app/(dashboard)/dashboard/dashboard-layout";

const Dashboard = () => {
  function getTimeOfDay() {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 4 && hours < 12) {
      return "morning";
    } else if (hours >= 12 && hours < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }

  const { currentUser } = useAuth()!;

  return (
    <>
      <div>
        <div className="flex items-center justify-between  mb-4 ">
          <div className="grid gap-1  container">
            <div className="flex items-center">
              <span className="font-heading text-3xl md:text-4xl flex gap-2 ">
                {`Good ${getTimeOfDay()},`}
                <p className="bg-gradient-to-r whitespace-nowrap font-bold capitalize to-amber-400 via-orange-500  from-red-500 bg-clip-text text-transparent">
                  {(currentUser?.firstName && currentUser?.firstName) || ""}
                </p>
              </span>
            </div>
            <p className="text-lg text-muted-foreground">
              This is your dashboard, come here to manage your account
            </p>
          </div>
        </div>
        <DashboardLayout />
      </div>
    </>
  );
};

export default Dashboard;

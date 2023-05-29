"use client";
import React from "react";
import { PageHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import KeyFeatures from "@/app/(dashboard)/dashboard/key-features";

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

  return (
    <>
      <div>
        <PageHeader
          heading={`Good ${getTimeOfDay()}, Patrick!`}
          text="This is your dashboard, come here to manage your account"
        />
        <div className="grid gap-4">
          <div className="grid gap-4 ">
            <div className="flex gap-4">
              <div className="border p-4 rounded-md flex  h-fit items-center gap-4">
                <span className="p-2 aspect-square h-10 rounded bg-muted">
                  <Icons.accounts className="h-6 w-6 text-primary" />
                </span>
                <div className="flex flex-col">
                  <h1 className="font-bold capitalize text-base text-muted-foreground whitespace-nowrap">
                    Tracked accounts
                  </h1>
                  <div className="text-4xl font-bold flex items-center ">
                    16
                    <h2 className="text-muted-foreground text-xl ">/20</h2>
                  </div>
                </div>
              </div>
              <div className="border p-4 rounded-md flex  h-fit items-center gap-4">
                <span className="p-2 aspect-square h-10 rounded bg-muted">
                  <Icons.products className="h-6 w-6 text-primary" />
                </span>
                <div className="flex flex-col">
                  <h1 className="font-bold capitalize text-base text-muted-foreground whitespace-nowrap">
                    Tracked products
                  </h1>
                  <div className="text-4xl font-bold flex items-center ">
                    23
                    <h2 className="text-muted-foreground text-xl ">/30</h2>
                  </div>
                </div>
              </div>
              <div className="border p-4 rounded-md flex  h-fit items-center gap-4">
                <span className="p-2 aspect-square h-10 rounded bg-muted">
                  <Icons.store className="h-6 w-6 text-primary" />
                </span>
                <div className="flex flex-col">
                  <h1 className="font-bold capitalize text-base text-muted-foreground whitespace-nowrap">
                    Linked Stores
                  </h1>
                  <div className="text-4xl font-bold flex items-center ">
                    1<h2 className="text-muted-foreground text-xl ">/3</h2>
                  </div>
                </div>
              </div>
            </div>
            {/* <CollectionDisplay /> */}
            <KeyFeatures />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

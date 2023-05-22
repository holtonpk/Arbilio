"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { db } from "@/context/Auth";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import AccountManage from "./account-manage";
import DataScrape from "./data-scrape";
import ProductManage from "./products-manage";

const AdminLayout = () => {
  const [showDataScrape, setShowDataScrape] = useState(false);
  const [showAccountManagement, setShowAccountManagement] = useState(false);
  const [showProductsManagement, setShowProductsManagement] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center p-8 gap-4 w-full mx-auto   ">
        <div className="grid divide-y divide-border border w-full rounded-md">
          <div className="w-full flex-col flex gap-4  p-6 ">
            <div
              onClick={() => setShowDataScrape(!showDataScrape)}
              className="w-full flex items-center cursor-pointer text-xl "
            >
              <Icons.chevronRight
                className={`${
                  showDataScrape ? "rotate-90" : "rotate-0"
                } w-6 h-6 transition-all`}
              />
              Data Scrape
            </div>
            {showDataScrape && <DataScrape />}
          </div>
          <div className="w-full flex-col flex gap-4  p-6 ">
            <div
              onClick={() => setShowAccountManagement(!showAccountManagement)}
              className="w-full flex items-center cursor-pointer text-xl "
            >
              <Icons.chevronRight
                className={`${
                  showAccountManagement ? "rotate-90" : "rotate-0"
                } w-6 h-6 transition-all`}
              />
              Account Management
            </div>
            {showAccountManagement && <AccountManage />}
          </div>
          <div className="w-full flex-col flex gap-4  p-6 relative">
            <div
              onClick={() => setShowProductsManagement(!showProductsManagement)}
              className="w-full flex items-center cursor-pointer text-xl "
            >
              <Icons.chevronRight
                className={`${
                  showProductsManagement ? "rotate-90" : "rotate-0"
                } w-6 h-6 transition-all`}
              />
              Product Management
            </div>
            {showProductsManagement && <ProductManage />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

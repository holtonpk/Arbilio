"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { db } from "@/context/Auth";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import AccountManage from "./account-manage";
import DataScrape from "./data-scrape";
const AdminLayout = () => {
  const [showDataScrape, setShowDataScrape] = useState(false);
  const [showAccountManagement, setShowAccountManagement] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center p-8 gap-4 w-full mx-auto   ">
        <DataStats />
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
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

const DataStats = (data: any) => {
  const [accountData, setAccountData] = useState<any>(undefined);
  const [productData, setProductData] = useState<any>(undefined);
  const [badAccountData, setBadAccountData] = useState<any>(undefined);

  const [resetLoading, setResetLoading] = useState(false);

  const accountDataFetched = useRef(false);
  const productDataFetched = useRef(false);
  const badAccountDataFetched = useRef(false);

  // useEffect(() => {
  //   async function getAccountData() {
  //     console.log("fetching account data");
  //     const records = await getDocs(collection(db, "tiktokAccounts"));
  //     setAccountData(records.docs);
  //     accountDataFetched.current = true;
  //   }
  //   if (!accountDataFetched.current) {
  //     getAccountData();
  //   }
  // }, []);

  // useEffect(() => {
  //   async function getProductData() {
  //     const records = await getDocs(collection(db, "tiktokProducts"));
  //     setProductData(records.docs);
  //     productDataFetched.current = true;
  //   }
  //   if (!productDataFetched.current) {
  //     getProductData();
  //   }
  // }, []);

  // useEffect(() => {
  //   async function getBadAccountData() {
  //     const records = await getDocs(collection(db, "tiktokBadAccounts"));
  //     setBadAccountData(records.docs);
  //     badAccountDataFetched.current = true;
  //   }
  //   if (!badAccountDataFetched.current) {
  //     getBadAccountData();
  //   }
  // }, []);

  const resetBadAccounts = async () => {
    setResetLoading(true);
    const records = await getDocs(collection(db, "tiktokBadAccounts"));
    records.docs.forEach(async (_doc) => {
      await deleteDoc(doc(db, "tiktokBadAccounts", _doc.id));
    });
    setResetLoading(false);
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col border rounded-md items-center p-2">
        <h1 className="text-muted-foreground">Total products</h1>
        <h2>{productData?.length}</h2>
      </div>
      <div className="flex flex-col border rounded-md items-center p-2">
        <h1 className="text-muted-foreground">Total accounts</h1>
        <h2>{accountData?.length}</h2>
      </div>
      <div className="flex flex-col border rounded-md items-center p-2">
        <h1 className="text-muted-foreground">bad accounts</h1>
        <h2>{badAccountData?.length}</h2>
      </div>
      <Button onClick={resetBadAccounts} variant="destructive" size="sm">
        {resetLoading ? <Icons.spinner className="animate-spin" /> : null}
        Reset bad accounts
      </Button>
    </div>
  );
};

"use client";
import React, { useState } from "react";
import Table from "./account-database-table";
import FilterBuilder from "@/components/filter-builder";
import ComboBox from "@/components/combo-box";
import DisplaySelector from "@/components/display-selector";
import { PageHeader } from "@/components/header";
import CardDisplay from "@/app/(dashboard)/accounts/account-database/account-database-cards";
import { DataSearch } from "@/components/data-search";
import AppliedFilters from "@/components/applied-filters";
import { Icons } from "@/components/icons";
import { accountDatabaseConfig } from "@/config/dashboard";
import EmptySearch from "@/components/empty-search";
import useData from "@/hooks/use-account-data";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const getData = async (startAfterId: string) => {
  const url = `${siteConfig.url}/api/account-database/startAfter/${startAfterId}`;
  const res = await fetch(url, {
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
  // return DummyData
};

const AccountDatabase = ({ originalData }: any) => {
  const [data, setData] = useState(originalData);
  const [lastDocId, setLastDocId] = useState(
    originalData[originalData.length - 1]?.recordId
  );
  const [loading, setLoading] = useState(false);

  console.log("data", originalData[originalData.length - 1]);

  const loadMore = async () => {
    setLoading(true);
    const newData = await getData(lastDocId);
    console.log("new", newData);
    setData((prevData: any) => [...prevData, ...newData]);
    setLastDocId(newData[newData.length - 1]?.recordId); // assuming each data object has an 'id' field
    setLoading(false);
  };

  const {
    sortedData,
    appliedFilterList,
    setAppliedFilterList,
    setSortParam,
    searchData,
    setDescending,
  } = useData({
    data: data,
  });

  const [displayType, setDisplayType] = useState<"grid" | "columns">("grid");
  const sortOptions = accountDatabaseConfig.sortOptions;

  return (
    <>
      <div className="grid gap-2 w-full ">
        <DataSearch
          placeholder="Search for an account"
          searchFunction={searchData}
        />
        <div className="flex justify-between w-[100%] flex-col gap-2 items-center lg:flex-row ">
          <div className="flex items-center gap-4 w-full lg:w-fit justify-between">
            <FilterBuilder
              appliedFilterList={appliedFilterList}
              setAppliedFilterList={setAppliedFilterList}
            />
            <div className="md:w-[200px] ">
              <ComboBox dropList={sortOptions} onSelect={setSortParam} />
            </div>
          </div>
          <div className="md:flex items-center gap-4 w-full lg:w-fit justify-between hidden ">
            <DisplaySelector
              displayType={displayType}
              setDisplayType={setDisplayType}
            />
          </div>
        </div>
      </div>
      <AppliedFilters
        appliedFilterList={appliedFilterList}
        setAppliedFilterList={setAppliedFilterList}
      />
      <div className="max-w-full mt-2 ">
        {sortedData?.length === 0 ? (
          <EmptySearch />
        ) : (
          <>
            {displayType === "grid" && (
              <CardDisplay accountDataBaseData={sortedData} />
            )}
            {displayType === "columns" && (
              <Table
                data={sortedData}
                setDescending={setDescending}
                setSortParam={setSortParam}
              />
            )}
          </>
        )}
      </div>
      <Button onClick={loadMore} className="mt-3">
        {loading ? <Icons.spinner className="animate-spin" /> : null}
        Load more
      </Button>
    </>
  );
};

export default AccountDatabase;

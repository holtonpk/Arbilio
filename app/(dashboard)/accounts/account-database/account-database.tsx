"use client";
import React, { useState } from "react";
// import { DataTable } from "@/components/account-table";
import FilterBuilder from "@/components/filter-builder";
import Sort from "@/components/sort-results";
import DisplaySelector from "@/components/display-selector";
import { DataSearch } from "@/components/data-search";
import AppliedFilters from "@/components/applied-filters";
import { Icons } from "@/components/icons";
import { accountDatabaseConfig } from "@/config/dashboard";
import EmptySearch from "@/components/empty-search";
import useData from "@/lib/hooks/use-account-data";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { AccountCard } from "@/components/ui/account-card";
import { DataTable } from "@/components/account-table/data-table";
import { columns } from "@/components/account-table/columns";

// Simulate a database read for tasks.
async function getTasks() {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();
  return tasks;
}

const getData = async (startAfterId: string) => {
  const url = `${siteConfig.url}/api/account-database/startAfter/${startAfterId}`;
  const res = await fetch(url, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const AccountDatabase = ({ originalData }: any) => {
  const [data, setData] = useState(originalData);
  const [TableData, setTableData] = useState(undefined);
  const [lastDocId, setLastDocId] = useState(
    originalData[originalData.length - 1]?.id
  );
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const newData = await getData(lastDocId);
    setLoading(false);
    const newTableData = await getTasks();
    console.log("nt", newTableData);
    setTableData(newTableData);
    setData((prevData: any) => [...prevData, ...newData]);
    setLastDocId(newData[newData.length - 1]?.id); // assuming each data object has an 'id' field
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
      <div className="flex md:flex-row flex-col gap-2 w-full ">
        <DataSearch
          placeholder="Search an user name. ex: @username"
          searchFunction={searchData}
          className="bg-background rounded-md"
        />
        <div className="flex  w-[100%] flex-col gap-2 items-center lg:flex-row ">
          <div className="flex items-center gap-4 w-full lg:w-fit md:justify-between">
            <FilterBuilder
              appliedFilterList={appliedFilterList}
              setAppliedFilterList={setAppliedFilterList}
              className="bg-background border-border"
            />
            <div className=" ">
              <Sort
                dropList={sortOptions}
                onSelect={setSortParam}
                className="bg-background border-border"
              />
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
      <div className="w-full mt-2  ">
        {sortedData?.length === 0 ? (
          <EmptySearch />
        ) : (
          <>
            {displayType === "grid" ? (
              <div className="grid  lg:grid-cols-4  grid-cols-1 sm:grid-cols-2 gap-8 h-full  ">
                {sortedData.map((account: any, i: number) => (
                  <AccountCard key={i} item={account} />
                ))}
              </div>
            ) : (
              <>
                {sortedData && (
                  <DataTable data={sortedData} columns={columns} />
                )}
              </>
              // <DataTable
              //   data={TableData}
              //   columns={columns}
              //   // setDescending={setDescending}
              //   // setSortParam={setSortParam}
              // />
            )}
          </>
        )}
      </div>
      <Button onClick={loadMore} className="mt-3">
        {loading ? <Icons.spinner className="animate-spin mr-2" /> : null}
        Load more
      </Button>
    </>
  );
};

export default AccountDatabase;

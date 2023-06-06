"use client";
import React, { useState } from "react";
// import { DataTable } from "@/components/account-table";
import FilterBuilder from "@/components/filter-builder";
import Sort from "@/components/sort-results";
import DisplaySelector from "@/components/display-selector";
import { DataSearch } from "@/components/data-search";
import AppliedFilters from "@/components/applied-filters";
import { accountDatabaseConfig } from "@/config/dashboard";
import EmptySearch from "@/components/empty-search";
import useData from "@/lib/hooks/use-account-data";
import { AccountCard } from "@/components/ui/account-card";
import { DataTable } from "@/components/table/data-table";
import { columns } from "../table/columns";

const AccountDatabase = ({ originalData }: any) => {
  const {
    sortedData,
    appliedFilterList,
    setAppliedFilterList,
    setSortParam,
    searchData,
  } = useData({
    data: originalData,
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
      <div className="w-full mt-2 relative z-[5]  ">
        {sortedData?.length === 0 ? (
          <EmptySearch />
        ) : (
          <>
            {displayType === "grid" ? (
              <div className="grid  lg:grid-cols-4  grid-cols-1 sm:grid-cols-2 gap-8 h-full  ">
                {sortedData.map((account: any, i: number) => (
                  <>
                    {i >= sortedData.length - 4 ? (
                      <AccountCard key={i} item={account} locked={true} />
                    ) : (
                      <AccountCard key={i} item={account} />
                    )}
                  </>
                ))}
              </div>
            ) : (
              <>
                {sortedData && (
                  <DataTable data={sortedData} columns={columns} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AccountDatabase;

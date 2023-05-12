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
import useData from "@/hooks/use-data";
const AccountDatabase = ({ data }: any) => {
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

  console.log("dd", data);
  const [displayType, setDisplayType] = useState<"grid" | "columns">("grid");
  const sortOptions = accountDatabaseConfig.sortOptions;

  return (
    <>
      <div className="flex flex-col gap-2 w-full ">
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
            <div className="w-[200px]">
              <ComboBox dropList={sortOptions} onSelect={setSortParam} />
            </div>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-fit justify-between">
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
      <div className="w-full mt-2">
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
    </>
  );
};

export default AccountDatabase;

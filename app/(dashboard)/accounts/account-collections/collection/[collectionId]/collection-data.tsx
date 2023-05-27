"use client";
import React, { useState } from "react";
import { Icons } from "@/components/icons";
import FilterBuilder from "@/components/filter-builder";
import ComboBox from "@/components/combo-box";
import DisplaySelector from "@/components/display-selector";
import { accountCollectionsConfig } from "@/config/dashboard";
import AppliedFilters from "@/components/applied-filters";
import { DataSearch } from "@/components/data-search";
import EmptySearch from "@/components/empty-search";
import useData from "@/lib/hooks/use-account-data";
import { CollectionOperations } from "@/components/buttons/collection-operations";
import { LinkButton } from "@/components/ui/link";
import { AccountCollectionData } from "@/types";
import { AccountCard } from "@/components/account-card";
import Table from "@/components/account-table";
const CollectionData = ({ data }: { data: AccountCollectionData }) => {
  const [displayType, setDisplayType] = useState<"grid" | "columns">("grid");
  const {
    sortedData,
    searchData,
    appliedFilterList,
    setAppliedFilterList,
    setSortParam,
    setDescending,
    unformattedData,
    hideItems,
  } = useData({ data: data.accounts });

  const sortOptions = accountCollectionsConfig.sortOptions;

  return (
    <>
      {unformattedData && unformattedData.length === 0 ? (
        <div className="w-full p-10 items-center justify-center gap-2 flex-col flex">
          <h1 className="text-primary text-2xl">This collections is empty</h1>
          <p className="text-muted-foreground">
            browse our account database to find accounts to add to this
            collection
          </p>
          <LinkButton href="/accounts/account-database" className="w-fit ">
            Account Database
          </LinkButton>
        </div>
      ) : (
        <>
          <div className="flex md:flex-row flex-col gap-2 w-full mb-3">
            <DataSearch
              placeholder="search"
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
                  <ComboBox
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
          {displayType === "grid" ? (
            <div className="grid  lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-8 h-full  ">
              {sortedData.map((account: any, i: number) => (
                <AccountCard key={i} item={account} />
              ))}
            </div>
          ) : (
            <Table
              data={sortedData}
              setSortParam={setSortParam}
              setDescending={setDescending}
            />
          )}
          {sortedData?.length === 0 && <EmptySearch />}
        </>
      )}
    </>
  );
};

export default CollectionData;

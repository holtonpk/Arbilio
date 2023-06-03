"use client";
import React, { useState } from "react";
import { Icons } from "@/components/icons";
import FilterBuilder from "@/components/filter-builder";
import Sort from "@/components/sort-results";
import DisplaySelector from "@/components/display-selector";
import { accountCollectionsConfig } from "@/config/dashboard";
import AppliedFilters from "@/components/applied-filters";
import { DataSearch } from "@/components/data-search";
import EmptySearch from "@/components/empty-search";
import useData from "@/lib/hooks/use-account-data";
import { CollectionOperations } from "@/components/buttons/collection-operations";
import { LinkButton } from "@/components/ui/link";
import { AccountCollectionData } from "@/types";
import { AccountCard } from "@/components/ui/account-card";
import { DataTable } from "@/components/account-table/data-table";
import { columns } from "./table/table-columns";
import Loading from "./loading";
const CollectionData = ({ data }: { data: AccountCollectionData }) => {
  const [displayType, setDisplayType] = useState<"grid" | "columns">("columns");

  const { sortedData, searchData, unformattedData } = useData({
    data: data.accounts,
  });

  const sortedDataCollection = data.accounts.map((account) => ({
    collection: data.collection,
    ...account,
  }));

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
          <div className="flex md:flex-row flex-col gap-2 w-full mb-3 ">
            <DataSearch
              placeholder="search"
              searchFunction={searchData}
              className="bg-background rounded-md"
            />

            <div className="md:flex items-center gap-4 w-full lg:w-fit justify-between hidden ">
              <DisplaySelector
                displayType={displayType}
                setDisplayType={setDisplayType}
              />
            </div>
          </div>
          <div className="pb-2 w-full ">
            {displayType === "grid" ? (
              <div className="grid  lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-8 h-full  ">
                {sortedData.map((account: any, i: number) => (
                  <AccountCard key={i} item={account} />
                ))}
              </div>
            ) : (
              <DataTable data={sortedDataCollection} columns={columns} />
            )}
            {sortedData?.length === 0 && <EmptySearch />}
          </div>
        </>
      )}
    </>
  );
};

export default CollectionData;

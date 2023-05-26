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
import useData from "@/hooks/use-account-data";
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
      <div className="flex gap-4 items-center mb-2">
        <div className="flex flex-row items-center gap-2">
          <LinkButton
            variant="ghost"
            href="/accounts/account-collections"
            className="w-fit "
            size="sm"
          >
            <Icons.chevronLeft className=" h-6 w-6" />
          </LinkButton>

          <h1 className="text-3xl h-fit  font-bold flex items-center text-primary  pb-0">
            {/* <Icons.collection className="h-8 w-8 mr-2" /> */}
            {data.collection.name}
          </h1>
          <CollectionOperations collection={data.collection} variant="ghost">
            <Icons.ellipsis className="h-4 w-4" />
          </CollectionOperations>
        </div>
      </div>
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
          <div className="flex flex-col w-full mb-2 gap-2">
            <div className="flex flex-row gap-2 ">
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-fit">
                <div className=" w-fit ">
                  <DataSearch
                    placeholder="Search"
                    searchFunction={searchData}
                  />
                </div>
                <div className="flex justify-between  md:gap-2 w-full md:w-fit ">
                  <FilterBuilder
                    appliedFilterList={appliedFilterList}
                    setAppliedFilterList={setAppliedFilterList}
                  />
                  <div className="w-fit  relative">
                    <ComboBox dropList={sortOptions} onSelect={setSortParam} />
                  </div>
                </div>
              </div>
              <div className="md:flex items-center gap-4 w-fit justify-between hidden">
                <DisplaySelector
                  displayType={displayType}
                  setDisplayType={setDisplayType}
                />
              </div>
            </div>
            <AppliedFilters
              appliedFilterList={appliedFilterList}
              setAppliedFilterList={setAppliedFilterList}
            />
          </div>
          {displayType === "grid" ? (
            <div className="grid  lg:grid-cols-4  grid-cols-2 gap-8 h-full  ">
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

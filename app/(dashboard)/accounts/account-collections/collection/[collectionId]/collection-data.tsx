"use client";

import React, { useEffect, useState, use } from "react";
import Table from "./account-collection-table";
import CardDisplay from "@/app/(dashboard)/accounts/account-collections/collection/[collectionId]/account-collection-cards";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FilterBuilder from "@/components/filter-builder";
import ComboBox from "@/components/combo-box";
import DisplaySelector from "@/components/display-selector";
import { accountCollectionsConfig } from "@/config/dashboard";
import AppliedFilters from "@/components/applied-filters";
import { DataSearch } from "@/components/data-search";
import EmptySearch from "@/components/empty-search";
import useData from "@/hooks/use-data";
import { CollectionOperations } from "@/components/collection-operations";

const CollectionData = ({ data }: any) => {
  const [displayType, setDisplayType] = useState<"grid" | "columns">("columns");

  const {
    sortedData,
    searchData,
    appliedFilterList,
    setAppliedFilterList,
    setSortParam,
    setDescending,
    unformattedData,
    hideItems,
  } = useData({ data: data.data });

  console.log("sd", sortedData);

  const sortOptions = accountCollectionsConfig.sortOptions;

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex flex-row items-center gap-2 mb-2">
          <Link
            href="/accounts/account-collections"
            className={cn(buttonVariants({ variant: "ghost" }), "w-fit ")}
          >
            <Icons.chevronLeft className=" h-6 w-6" />
          </Link>
          <h1 className="text-3xl h-fit  font-bold flex items-center text-primary  pb-0">
            <Icons.collection className="h-8 w-8 mr-2" />
            {data.collection.name}
          </h1>
        </div>
        <CollectionOperations collection={data.collection} />
      </div>
      {unformattedData && unformattedData.length === 0 ? (
        <div className="w-full p-10 items-center justify-center gap-2 flex-col flex">
          <h1 className="text-primary text-2xl">This collections is empty</h1>
          <p className="text-muted-foreground">
            browse our account database to find accounts to add to this
            collection
          </p>
          <Link
            href="/accounts/account-database"
            className={cn(buttonVariants({ variant: "default" }), "w-fit ")}
          >
            Account Database
          </Link>
        </div>
      ) : (
        <>
          <>
            <div className="flex flex-col mb-2 gap-2">
              <div className="flex flex-row  justify-between ">
                <div className="flex flex-row gap-2 w-fit">
                  <div className="w-[300px]">
                    <DataSearch
                      placeholder="...Search"
                      searchFunction={searchData}
                    />
                  </div>
                  <FilterBuilder
                    appliedFilterList={appliedFilterList}
                    setAppliedFilterList={setAppliedFilterList}
                  />
                  <div className="w-[200px] relative">
                    <ComboBox dropList={sortOptions} onSelect={setSortParam} />
                  </div>
                </div>
                <div className="flex items-center gap-4 w-fit justify-between">
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
            {displayType === "grid" && (
              <CardDisplay
                accountDataBaseData={sortedData}
                collection={data.collection}
              />
            )}
            {displayType === "columns" && (
              <div className=" relative">
                <Table
                  data={sortedData}
                  collection={data.collection}
                  setSortParam={setSortParam}
                  setDescending={setDescending}
                  hideItems={hideItems}
                />
              </div>
            )}
            {sortedData?.length === 0 && <EmptySearch />}
          </>
        </>
      )}
    </>
  );
};

export default CollectionData;

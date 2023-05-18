"use client";
import Image from "next/image";
import React from "react";
import useData from "@/hooks/use-product-data";
import Table from "./product-database-table";
import { ProductType } from "@/types";
import FilterBuilder from "@/components/filter-builder";
import ComboBox from "@/components/combo-box";
import DisplaySelector from "@/components/display-selector";
import { DataSearch } from "@/components/data-search";
import AppliedFilters from "@/components/applied-filters";
import { Icons } from "@/components/icons";
import EmptySearch from "@/components/empty-search";
import { Button } from "@/components/ui/button";
import { productDatabaseConfig } from "@/config/dashboard";
import CardDisplay from "./product-database-cards";

interface ProductDataBaseProps {
  data: ProductType[];
}

const ProductDataBase = ({ data }: ProductDataBaseProps) => {
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

  const [displayType, setDisplayType] = React.useState<"grid" | "columns">(
    "grid"
  );
  const sortOptions = productDatabaseConfig.sortOptions;

  return (
    <>
      <div className="gap-2 w-full flex  ">
        <DataSearch
          placeholder="Search for an account"
          searchFunction={searchData}
        />

        <div className="md:flex items-center gap-4 w-full lg:w-fit justify-between hidden ">
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
      <div className="w-full mt-2 ">
        {sortedData?.length === 0 ? (
          <EmptySearch />
        ) : (
          <>
            {displayType === "grid" && <CardDisplay data={sortedData} />}
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

export default ProductDataBase;

interface ProductViewProps {
  item: ProductType;
}

const ProductView = ({ item }: ProductViewProps) => {
  return (
    <div className="flex flex-row ">
      <div className="grid grid-cols-[80px_1fr] gap-4">
        <div className="h-20 w-20 relative rounded-md overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1>{item.title}</h1>
      </div>
    </div>
  );
};

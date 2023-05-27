"use client";
import Image from "next/image";
import React from "react";
import useData from "@/lib/hooks/use-product-data";
import Table from "./product-database-table";
import { ProductDataBaseType } from "@/types";
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
  data: ProductDataBaseType[];
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
      <ItemChecklist />

      <div className="w-full mt-2  p-4 bg-muted/60 ">
        <div className="gap-2 w-full flex mb-3 ">
          <DataSearch
            placeholder="Search for a product"
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
        <AppliedFilters
          appliedFilterList={appliedFilterList}
          setAppliedFilterList={setAppliedFilterList}
        />
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
  item: ProductDataBaseType;
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

const items = [
  "Car Accessories",
  "Wireless Chargers",
  "Cable Chargers",
  "Stress Relief Toys",
  "Blenders/Juicers",
  "Lighting/Decor",
  "Fitness Equipment",
  "Sleep Devices",
  "Power Banks",
  "Printers",
  "Pet Supplies",
  "Smoking Accessories",
  "Pens",
  "Flasks",
  "Lighters",
  "Cleaning Devices",
  "Massage Tools",
  "Portable Chargers",
];

const ItemChecklist: React.FC = () => {
  const [selectedItems, setSelectedItems] = React.useState<
    Record<string, boolean>
  >(items.reduce((acc, item) => ({ ...acc, [item]: true }), {}));

  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const DeselectAll = () => {
    setSelectedItems({});
  };

  return (
    <div className="grid p-4  rounded-md">
      <div className="flex w-full justify-between">
        <h1 className="text-lg">Product Categories</h1>
        <button
          onClick={DeselectAll}
          className="text-theme-blue hover:opacity-60"
        >
          Deselect all
        </button>
      </div>
      <div className="grid grid-cols-6 gap-3 mt-3 w-full ">
        {items.map((item, index) => (
          <label key={index} className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-theme-blue"
              checked={selectedItems[item] || false}
              onChange={() => handleCheckboxChange(item)}
            />
            <span className="text-muted-foreground font-medium ">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

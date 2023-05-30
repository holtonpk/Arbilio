"use client";
import Image from "next/image";
import React from "react";
import useData from "@/lib/hooks/use-product-data";
import Table from "./product-database-table";
import { ProductDataBaseType } from "@/types";
import FilterBuilder from "@/components/filter-builder";
import Sort from "@/components/sort-results";
import DisplaySelector from "@/components/display-selector";
import { DataSearch } from "@/components/data-search";
import AppliedFilters from "@/components/applied-filters";
import { Icons } from "@/components/icons";
import EmptySearch from "@/components/empty-search";
import { Button } from "@/components/ui/button";
import { productDatabaseConfig } from "@/config/dashboard";
import { ProductDisplay } from "./product-database-cards";
import { Input } from "@/components/ui/input";
import Tooltip from "@/components/ui/tooltip";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { set } from "date-fns";
import { toast } from "@/components/ui/use-toast";

interface ProductDataBaseProps {
  data: ProductDataBaseType[];
}

const ProductDataBase = () => {
  // const {
  //   sortedData,
  //   appliedFilterList,
  //   setAppliedFilterList,
  //   setSortParam,
  //   searchData,
  //   setDescending,
  // } = useData({
  //   data: data,
  // });
  const [data, setData] = React.useState<ProductDataBaseType[] | undefined>(
    undefined
  );

  const [displayType, setDisplayType] = React.useState<"grid" | "columns">(
    "grid"
  );
  // const sortOptions = productDatabaseConfig.sortOptions;

  const setDescending = (value: boolean) => {
    // setSortParam((prev) => ({ ...prev, descending: value }));
  };
  const setSortParam = (value: string) => {
    // setSortParam((prev) => ({ ...prev, param: value }));
  };

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const SearchData = async () => {
    if (selectedItems.length > 0) {
      setIsLoading(true);
      const queryData: ProductDataBaseType[] = [];

      const getIds = selectedItems.map(async (categoryId) => {
        console.log(
          `${siteConfig.url}/api/product-database-query/${categoryId}`
        );
        const res = await fetch(
          `${siteConfig.url}/api/product-database-query/${categoryId}`
        );
        const newData = await res.json();
        queryData.push(...newData);
      });
      const d = await Promise.all(getIds);
      setData(queryData);
      setIsLoading(false);
    } else {
      toast({
        title: "Select a category",
        description:
          "Please select at least one category to search the database",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="container bg-background rounded-md  p-4  border-2 w-[80%] -translate-y-[150px]">
        <ItemChecklist
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <Button
          onClick={SearchData}
          variant="default"
          className="w-full"
          size="lg"
        >
          {isLoading && <Icons.spinner className="animate-spin h-6 w-6" />}
          Search Database
        </Button>
      </div>

      {/* <div className="absolute top-4 right-4 hidden md:block">
        <DisplaySelector
          displayType={displayType}
          setDisplayType={setDisplayType}
        />
      </div> */}
      <div className="w-full  p-4 bg-muted -translate-y-[130px]">
        {data && (
          <>
            <div className="grid md:grid-cols-2  gap-8 h-full w-full ">
              {data.map((item: any, i: number) => (
                <ProductDisplay key={i} item={item} />
              ))}
            </div>
            {/* {displayType === "grid" ? (
              <div className="grid md:grid-cols-2  gap-8 h-full w-full ">
                {data.map((item: any, i: number) => (
                  <ProductDisplay key={i} item={item} />
                ))}
              </div>
            ) : (
              <Table
                data={data}
                setDescending={setDescending}
                setSortParam={setSortParam}
              />
            )} */}
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

interface ItemChecklistProps {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const ItemChecklist = ({
  selectedItems,
  setSelectedItems,
}: ItemChecklistProps) => {
  const handleCheckboxChange = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prevItems) => prevItems.filter((item) => item !== id));
    } else {
      setSelectedItems((prevItems) => [...prevItems, id]);
    }
  };

  const DeselectAll = () => {
    setSelectedItems([]);
  };

  // const total = categories.flatMap((item) => item.ids).length;

  return (
    <>
      {/* <h1 className="text-2xl">Query Builder</h1> */}
      <div className="grid   ">
        {/* <div className="p-2 flex flex-col gap-4">
          <div className="grid gap-3">
            <div className="flex items-center">
              <label className="text-lg">Price</label>
              <Tooltip content="Filter product by suppliers listed unit price ">
                <div className="flex h-4 w-8 justify-center">
                  <Icons.helpCircle className="h-4 w-4 text-gray-600" />
                </div>
              </Tooltip>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                className="border rounded-md p-2"
                placeholder="Min price"
              />
              <Input
                type="number"
                className="border rounded-md p-2"
                placeholder="Max price"
              />
            </div>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <label className="text-lg">Total Sellers</label>
              <Tooltip content="Filter product by total sellers linked the the account">
                <div className="flex h-4 w-8 justify-center">
                  <Icons.helpCircle className="h-4 w-4 text-gray-600" />
                </div>
              </Tooltip>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                className="border rounded-md p-2"
                placeholder="Min sellers"
              />
              <Input
                type="number"
                className="border rounded-md p-2"
                placeholder="Max sellers"
              />
            </div>
          </div>
        </div> */}

        <div className="grid w-full p-2">
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <h1 className="text-lg">Product Niche</h1>
              <Tooltip content="Filter product by niche/category of product">
                <div className="flex h-4 w-8 justify-center">
                  <Icons.helpCircle className="h-4 w-4 text-gray-600" />
                </div>
              </Tooltip>
            </div>

            <button
              onClick={DeselectAll}
              className="text-destructive hover:opacity-60"
            >
              Deselect all
            </button>
          </div>

          <div className="grid grid-cols-2  border rounded-md p-4 lg:grid-cols-3 gap-4 mt-3 w-full ">
            {categories.map((item, index) => (
              <>
                <label key={index} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-theme-blue"
                    checked={selectedItems && selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <span className="text-muted-foreground text-[12px] md:text-base font-medium whitespace-nowrap ">
                    {item.title}
                  </span>
                </label>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

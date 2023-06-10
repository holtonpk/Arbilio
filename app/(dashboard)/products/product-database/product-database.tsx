"use client";
import React from "react";
import { ProductType } from "@/types";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ProductDisplay } from "./product-database-cards";
import Tooltip from "@/components/ui/tooltip";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyPlaceholder } from "@/components/empty-placeholder";

const MAX_CATEGORY_SELECTION = 3;
const AVAILABLE_SEARCH_CREDITS = 4;

const ProductDataBase = () => {
  const [data, setData] = React.useState<ProductType[] | undefined>(undefined);

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const SearchData = async () => {
    if (selectedItems.length > 0) {
      setIsLoading(true);
      const queryData: ProductType[] = [];

      const getIds = selectedItems.map(async (categoryId) => {
        const res = await fetch(
          `${siteConfig.url}/api/product-database-query/${categoryId}`
        );
        const newData = await res.json();
        queryData.push(...(newData || []));
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

  const DeselectAll = () => {
    setSelectedItems([]);
  };

  return (
    <>
      <div className="w-full  p-4 container">
        {data ? (
          <div className="container">
            <div className="flex items-center md:flex-row flex-col w-fit  mb-4 gap-4 ml-auto">
              <div className="flex items-center">
                <Tooltip content="Credits reset every 24 hours. Upgrade to premium for unlimited search credits">
                  <div className="flex h-4 w-8 justify-center">
                    <Icons.helpCircle className="h-4 w-4 text-gray-600" />
                  </div>
                </Tooltip>
                <p className="text-sm text-muted-foreground">{`Available Search credits: ${AVAILABLE_SEARCH_CREDITS}`}</p>
              </div>
              <Button onClick={() => setData(undefined)}>New Search</Button>
            </div>
            {data.length > 0 ? (
              <div className="grid  gap-8 h-full w-full ">
                {data.map((item: any, i: number) => (
                  <ProductDisplay key={i} item={item} />
                ))}
              </div>
            ) : (
              <EmptyPlaceholder className="w-[90%] mt-4 mx-auto bg-background">
                <EmptyPlaceholder.Icon name="search" />
                <EmptyPlaceholder.Title>
                  No results found
                </EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                  Please select a category and click search to find products
                </EmptyPlaceholder.Description>
              </EmptyPlaceholder>
            )}
          </div>
        ) : (
          <div className="container bg-background rounded-md  p-4  border-2 w-[80%] ">
            <div className="flex justify-between w-full h-fit ">
              <div className="flex items-center">
                <h1 className="text-lg font-semibold leading-none tracking-tight">
                  Product category
                </h1>
                <Tooltip content="Filter product by niche/category of product">
                  <div className="flex h-4 w-8 justify-center">
                    <Icons.helpCircle className="h-4 w-4 text-gray-600" />
                  </div>
                </Tooltip>
              </div>
              {selectedItems.length > 0 && (
                <button
                  onClick={DeselectAll}
                  className="text-destructive hover:opacity-60 whitespace-nowrap text-[12px] leading-none"
                >
                  Deselect all
                </button>
              )}
            </div>
            <ItemChecklist
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
            <div className="w-full mt-3  flex md:flex-row flex-col items-center gap-3">
              <Button onClick={SearchData} variant="default" size="lg">
                {isLoading && (
                  <Icons.spinner className="animate-spin h-6 w-6 mr-2" />
                )}
                Search Database
              </Button>
              <div className="flex items-center">
                <Tooltip content="Credits reset every 24 hours. Upgrade to premium for unlimited search credits">
                  <div className="flex h-4 w-8 justify-center">
                    <Icons.helpCircle className="h-4 w-4 text-gray-600" />
                  </div>
                </Tooltip>
                <p className="text-sm text-muted-foreground">{`Available Search credits: ${AVAILABLE_SEARCH_CREDITS}`}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDataBase;

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
      if (selectedItems.length >= MAX_CATEGORY_SELECTION) {
        toast({
          title: "Max category selection reached",
          description: `You can only select a maximum of ${MAX_CATEGORY_SELECTION} categories at a time, upgrade to premium to select more categories`,
          variant: "destructive",
        });
        return;
      }
      setSelectedItems((prevItems) => [...prevItems, id]);
    }
  };

  return (
    <div className="grid grid-cols-2   border  p-4  rounded-md bg-muted/40 lg:grid-cols-3 gap-4 mt-3 w-full ">
      {categories.map((item, index) => (
        <>
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              checked={selectedItems && selectedItems.includes(item.id)}
              onCheckedChange={() => handleCheckboxChange(item.id)}
            />
            <label
              htmlFor={item.id}
              className="text-[12px] md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.title}
            </label>
          </div>
        </>
      ))}
    </div>
  );
};

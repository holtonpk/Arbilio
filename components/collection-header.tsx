// import ComboBox, { ComboBoxSkeleton } from "../ComboBox";
import { BsGrid, BsListCheck } from "react-icons/bs";
import Skeleton from "@/components/ui/custom-skeleton";
import FilterBuilder from "@/components/filter-builder";
import { FilterList } from "@/types";
import { Button } from "@/components/ui/button";

import ComboBox, { ComboBoxSkeleton } from "./combo-box";

interface CollectionHeaderProps {
  data: boolean;
  onSearch?: (searchTerm: string) => void;
  displayType?: "grid" | "columns";
  setDisplayType?: (displayType: "grid" | "columns") => void;
  comboBoxes?: any;
  appliedFilterList?: FilterList[];
  setAppliedFilterList?: (filterList: FilterList[]) => void;
}

export const CollectionHeader = ({
  data,
  onSearch,
  displayType,
  setDisplayType,
  comboBoxes,
  appliedFilterList,
  setAppliedFilterList,
}: CollectionHeaderProps) => {
  return (
    <div className="flex flex-col mb-4 ">
      <div className="flex items-center gap-4 w-full">
        {onSearch && (
          <div className="w-[30%]">
            {data ? (
              <SearchInput onSearch={onSearch} />
            ) : (
              <SearchInputSkeleton />
            )}
          </div>
        )}
        <div className="flex items-center gap-4 ">
          {appliedFilterList && setAppliedFilterList && (
            <>
              {data ? (
                <FilterBuilder
                  appliedFilterList={appliedFilterList}
                  setAppliedFilterList={setAppliedFilterList}
                />
              ) : (
                <AddFilterButtonSkeleton />
              )}
            </>
          )}
          {comboBoxes && (
            <>
              {comboBoxes.map((comboBox: any, i: number) => (
                <>
                  {data ? (
                    <ComboBox
                      key={i}
                      dropList={comboBox}
                      onSelect={() => null}
                    />
                  ) : (
                    <ComboBoxSkeleton key={i} />
                  )}
                </>
              ))}
            </>
          )}
          {displayType && (
            <>
              {data ? (
                <DisplaySelect
                  displayType={displayType}
                  setDisplayType={setDisplayType}
                />
              ) : (
                <DisplaySelectSkeleton />
              )}
            </>
          )}
        </div>
      </div>

      <AppliedFilterDisplay
        appliedFilterList={appliedFilterList}
        setAppliedFilterList={setAppliedFilterList}
      />
    </div>
  );
};
export default CollectionHeader;

export const AppliedFilterDisplay = ({
  appliedFilterList,
  setAppliedFilterList,
}: any) => {
  return (
    <>
      {appliedFilterList &&
        setAppliedFilterList &&
        appliedFilterList.length > 0 && (
          <div className="flex items center gap-4 flex-wrap mt-4">
            <>
              {appliedFilterList.map((filter: any, i: number) => (
                <div className="bg-indigo-600 rounded-md p-2 flex items-center gap-2">
                  <span className="text-white">
                    {filter.field + " " + filter.operator + " " + filter.value}
                  </span>
                  <button
                    onClick={() => {
                      setAppliedFilterList(
                        appliedFilterList.filter(
                          (_: any, index: number) => index !== i
                        )
                      );
                    }}
                  >
                    <HiX className="h-4 w-4 text-white" />
                  </button>
                </div>
              ))}
            </>
          </div>
        )}
    </>
  );
};

export const DisplaySelect = ({ displayType, setDisplayType }: any) => {
  const displayGrid = () => {
    setDisplayType("grid");
  };
  const displayColumns = () => {
    setDisplayType("columns");
  };
  const variant = "outline";

  return (
    <div className="flex gap-2 w-fit ">
      {/* <button
        onClick={displayGrid}
        className={`${
          displayType == "grid"
            ? "border-indigo-600/40 border  text-indigo-600"
            : "bg-transparent text-indigo-600/50 hover:text-indigo-600"
        }    rounded-md aspect-square p-2 justify-center flex items-center`}
      >
        <BsGrid className="h-6 w-6" />
      </button> */}
      <Button
        onClick={displayGrid}
        className="flex items-center justify-center whitespace-nowrap"
        variant={displayType == "grid" ? "outline" : "ghost"}
        size="sm"
      >
        <BsGrid className="h-6 w-6" />
      </Button>
      <Button
        onClick={displayColumns}
        className="flex items-center justify-center whitespace-nowrap"
        variant={displayType == "columns" ? "outline" : "ghost"}
        size="sm"
      >
        <BsListCheck className="h-6 w-6" />
      </Button>
    </div>
  );
};

const DisplaySelectSkeleton = () => {
  return (
    <div className="flex gap-2 w-fit ">
      <Skeleton width={"40px"} height={"40px"} />
      <Skeleton width={"40px"} height={"40px"} />
    </div>
  );
};

import { useState } from "react";
import { HiX } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { BiFilter } from "react-icons/bi";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const AddFilterButtonSkeleton = () => {
  return (
    <div className="  w-[100px] h-10 gap-2   shadow-lg  rounded-md flex items-center ">
      <Skeleton width={"100%"} height={"100%"} />
    </div>
  );
};

export const SearchInput = ({ onSearch, placeholder }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="flex items-center h-full    rounded-md    w-full justify-between relative  ">
      <input
        type="text"
        placeholder={placeholder || "Search"}
        value={searchTerm}
        onChange={handleSearch}
        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {/* <BiSearch className="absolute h-6 w-6 left-2 text-indigo-600 top-1/2 -translate-y-1/2" /> */}
      {searchTerm && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="absolute top-1/2 -translate-y-1/2 right-0 px-3 py-2 text-primary"
        >
          <HiX />
        </button>
      )}
    </div>
  );
};

export const SearchInputSkeleton = () => {
  return (
    <div className="flex items-center h-10   shadow-lg rounded-md   w-full justify-between relative  ">
      <Skeleton width={"100%"} height={"100%"} />
    </div>
  );
};

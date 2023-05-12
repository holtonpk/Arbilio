"use client";
import React, { useState } from "react";
import { IoHeart, IoPlay, IoTrendingUp } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import ComboBox from "@/components/combo-box";
import FilterBuilder from "@/components/filter-builder";
import DisplaySelector from "@/components/display-selector";

export const SortData = () => {
  const FilterOptions = {
    title: "Sort by",
    onSelect: (item: any) => {
      console.log(item);
    },
    items: [
      {
        title: "Popularity",
        icon: <IoTrendingUp className="h-5 w-5" />,
      },
      {
        title: "Followers",
        icon: <MdPerson className="h-5 w-5" />,
      },
      {
        title: "Likes",
        icon: <IoHeart className="h-5 w-5" />,
      },
      {
        title: "Posts",
        icon: <IoPlay className="h-5 w-5" />,
      },
    ],
  };
  return (
    <div className="w-[200px]">
      <ComboBox dropList={FilterOptions} />
    </div>
  );
};

export const PerPage = () => {
  const PerPageOptions = {
    title: "Per Page",
    onSelect: (item: any) => {
      console.log(item);
    },
    items: [
      {
        title: "8",
        value: 8,
      },
      {
        title: "20",
        value: 20,
      },
      {
        title: "50",
        value: 50,
      },
      {
        title: "100",
        value: 100,
      },
    ],
  };
  return (
    <div className="w-[200px]">
      <ComboBox dropList={PerPageOptions} />
    </div>
  );
};

export const Filter = () => {
  const [appliedFilterList, setAppliedFilterList] = useState<any[]>([]);

  return (
    <FilterBuilder
      appliedFilterList={appliedFilterList}
      setAppliedFilterList={setAppliedFilterList}
    />
  );
};

export const Displays = () => {
  const [displayType, setDisplayType] = useState<"grid" | "columns">("grid");

  return (
    <DisplaySelector
      displayType={displayType}
      setDisplayType={setDisplayType}
    />
  );
};

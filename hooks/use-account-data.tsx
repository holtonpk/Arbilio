"use client";
import react, { useState, useCallback } from "react";
import { sortData } from "@/lib/utils";
import { FilterList } from "@/types";

interface UseDataProps {
  data: any;
}

interface UseDataReturn {
  hideItems: (recordIdArray: string[]) => void;
  unformattedData: any[];
  searchData: (searchTerm: string) => void;
  sortedData: any[];
  appliedFilterList: FilterList[];
  setAppliedFilterList: (filterList: FilterList[]) => void;
  setSortParam: (param: string) => void;
  setDescending: (descending: boolean) => void;
  descending: boolean;
}

const useData = ({ data }: UseDataProps): UseDataReturn => {
  const [unformattedData, setUnformattedData] = useState(data);
  const [appliedFilterList, setAppliedFilterList] = useState<FilterList[]>([]);
  const [activeData, setActiveData] = useState<any[]>(data);
  const [descending, setDescending] = useState<boolean>(true);
  const [sortParam, setSortParam] = useState<string>("");

  react.useEffect(() => {
    setUnformattedData(data);
    setActiveData(data);
  }, [data]);

  react.useEffect(() => {
    if (appliedFilterList && appliedFilterList.length > 0) {
      setActiveData(sortData(unformattedData, appliedFilterList));
    } else {
      setActiveData(unformattedData);
    }
  }, [appliedFilterList]);

  const searchData = (searchTerm: string) => {
    if (searchTerm === "") {
      setActiveData(unformattedData);
      return;
    }
    const filteredData = activeData.filter((account: any) => {
      return (
        account?.uniqueId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account?.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account?.product?.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });
    if (filteredData.length === 0) {
      setActiveData([]);
      return;
    }
    setActiveData(filteredData);
  };

  const hideItems = (recordIdArray: string[]) => {
    const filteredData = activeData.filter((account: any) => {
      return !recordIdArray.includes(account.recordId);
    });
    setActiveData(filteredData);
    setUnformattedData(filteredData);
  };

  const sortedData =
    activeData &&
    activeData.sort((a: any, b: any) => {
      if (a.stats[sortParam] < b.stats[sortParam]) {
        return descending ? 1 : -1;
      }

      if (a.stats[sortParam] > b.stats[sortParam]) {
        return descending ? -1 : 1;
      }
      return 0;
    });

  return {
    hideItems,
    unformattedData,
    searchData,
    appliedFilterList,
    setAppliedFilterList,
    sortedData,
    setSortParam,
    setDescending,
    descending,
  };
};

export default useData;

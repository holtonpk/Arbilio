import React from "react";
import { Icons } from "@/components/icons";
import { FilterList } from "@/types";
import { formatNumber } from "@/lib/utils";
interface AppliedFiltersProps {
  appliedFilterList: FilterList[];
  setAppliedFilterList: any;
}
const AppliedFilters = ({
  appliedFilterList,
  setAppliedFilterList,
}: AppliedFiltersProps) => {
  return (
    <>
      {appliedFilterList?.length > 0 && (
        <div className="flex w-[100%] items-center gap-4 flex-wrap mt-2">
          <>
            {appliedFilterList.map((filter: FilterList, i: number) => (
              <div
                key={i}
                className="border  border-primary rounded-md p-2 flex items-center gap-2"
              >
                <button
                  onClick={() => {
                    setAppliedFilterList(
                      appliedFilterList.filter(
                        (_: any, index: number) => index !== i
                      )
                    );
                  }}
                >
                  <Icons.close className="h-4 w-4 text-primary " />
                </button>
                <span className="text-primary">
                  {filter.label +
                    " " +
                    filter.operator +
                    " " +
                    formatNumber(filter.value)}
                </span>
              </div>
            ))}
          </>
        </div>
      )}
    </>
  );
};

export default AppliedFilters;

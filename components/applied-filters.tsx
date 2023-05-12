import React from "react";
import { Icons } from "@/components/icons";

interface AppliedFiltersProps {
  appliedFilterList: any;
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
            {appliedFilterList.map((filter: any, i: number) => (
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
                  {filter.field + " " + filter.operator + " " + filter.value}
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

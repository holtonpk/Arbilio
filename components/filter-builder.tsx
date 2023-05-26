"use client";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FilterList } from "@/types";
import { Icons } from "./icons";
import { Input } from "./ui/input";
import { CustomListBox } from "@/components/list-box";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogAction,
} from "@/components/ui/dialog";
import { accountDatabaseConfig } from "@/config/dashboard";
interface Props {
  appliedFilterList: FilterList[];
  setAppliedFilterList: (filterList: FilterList[]) => void;
  className?: string;
}

const FilterBuilder = ({
  appliedFilterList,
  setAppliedFilterList,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  //   a list of the filters
  const [filterList, setFilterList] = useState<FilterList[]>([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //   this adds a new blank filter row to filterList
  const addFilterRow = () => {
    setFilterList([
      ...filterList,
      {
        rowId: Math.floor(Math.random() * 100000),
        field: "",
        operator: "",
        value: "",
        combine: "and",
        label: "",
      },
    ]);
  };

  const setCombine = (rowId: number, combine: "and" | "or") => {
    setFilterList(
      filterList.map((filter) => {
        if (filter.rowId === rowId) {
          return { ...filter, combine };
        }
        return filter;
      })
    );
  };

  const removeFilterRow = (rowId: number) => {
    setFilterList(filterList.filter((filter) => filter.rowId !== rowId));
  };

  const applyFilters = () => {
    setAppliedFilterList(filterList);
    closeModal();
  };

  return (
    <>
      <Button
        onClick={openModal}
        className={cn(
          "flex items-center justify-center gap-2 bg-background",
          className
        )}
        variant="outline"
      >
        <Icons.filter className="h-6 w-6" />
        Filters
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="min-w-[50vw] max-w-[850px]">
          <DialogHeader>
            <DialogTitle>Create a filter</DialogTitle>
            <DialogDescription>
              Create a filter to narrow down your search results
            </DialogDescription>
          </DialogHeader>

          <div className="w-full flex flex-col items-center gap-2 ">
            <div className="  h-fit w-full flex items-center gap-2 flex-col">
              {filterList.map((filter: FilterList, i) => (
                <div key={i} className="w-full flex flex-col items-center">
                  <FilterRow
                    filter={filter}
                    filterList={filterList}
                    setFilterList={setFilterList}
                    removeFilterRow={removeFilterRow}
                  />
                  {filterList.length > 1 && i < filterList.length - 1 && (
                    <div className="flex flex-row w-fit   rounded-md gap-2 ">
                      <Button
                        onClick={() => setCombine(filter.rowId, "and")}
                        className="flex items-center justify-center gap-2"
                        variant={
                          filter.combine == "and" ? "default" : "outline"
                        }
                      >
                        And
                      </Button>
                      <Button
                        onClick={() => setCombine(filter.rowId, "or")}
                        className="flex items-center justify-center gap-2"
                        variant={filter.combine == "or" ? "default" : "outline"}
                      >
                        or
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={addFilterRow}
              className="flex items-center justify-center gap-2 w-full"
              variant="outline"
            >
              <Icons.add className="h-5 w-5 " />
              Add new filter row
            </Button>
          </div>

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <DialogAction
              onClick={async (event) => {
                applyFilters();
              }}
              className="bg-primary"
            >
              <Icons.add className="mr-2 h-4 w-4" />
              <span>Apply</span>
            </DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterBuilder;

interface FilterRowProps {
  filter: FilterList;
  filterList: FilterList[];
  setFilterList: (filterList: FilterList[]) => void;
  removeFilterRow: (rowId: number) => void;
}

const FilterRow = ({
  filter,
  filterList,
  setFilterList,
  removeFilterRow,
}: FilterRowProps) => {
  const fields = accountDatabaseConfig.filterOptions.fields;
  const operators = accountDatabaseConfig.filterOptions.operators;

  const [comparisonField, setComparisonField] = useState(
    fields.find((field) => field.value === filter.field)
  );

  const [comparisonOperator, setComparisonOperator] = useState(
    operators.find((operator) => operator.value === filter.operator)
  );
  const [comparisonValue, setComparisonValue] = useState(filter.value);

  const handleComparisonValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setComparisonValue(event.target.value);
  };

  const createNewFilterList = useCallback(() => {
    return filterList.map((filterItem: FilterList) => {
      if (filterItem.rowId === filter.rowId) {
        return {
          ...filterItem,
          field: comparisonField?.value || "",
          operator: comparisonOperator?.value || "",
          value: comparisonValue,
          label: comparisonField?.label || "",
        };
      }
      return filterItem;
    });
  }, [
    comparisonField,
    comparisonOperator,
    comparisonValue,
    filter.rowId,
    filterList,
  ]);

  useEffect(() => {
    const newFilterList = createNewFilterList();

    if (JSON.stringify(newFilterList) !== JSON.stringify(filterList)) {
      setFilterList(newFilterList);
    }
  }, [createNewFilterList, filterList, setFilterList]);

  return (
    <div className="w-full flex relative items-center  ">
      {/* <RxDragHandleDots2 className="h-6 w-6 text-indigo-100  " /> */}

      <Button
        onClick={() => removeFilterRow(filter.rowId)}
        className="aspect-square  p-1  flex justify-center items-center rounded-md"
        variant="outline"
      >
        <Icons.close className="h-4 w-4" />
      </Button>

      <div className="h-16 p-2 items-center   justify-between rounded-md flex-grow flex gap-4 ">
        <div className="w-[40%]">
          <CustomListBox
            value={comparisonField}
            values={fields}
            onChange={setComparisonField}
          />
        </div>
        <div className="w-[35%]">
          <CustomListBox
            value={comparisonOperator}
            values={operators}
            onChange={setComparisonOperator}
          />
        </div>

        <Input
          type="number"
          name="comparisonValue"
          id="comparisonValue"
          className="relative w-[20%] bg-transparent cursor-default rounded-lg  border text-primary  py-2 pl-3  text-left "
          placeholder="value"
          value={comparisonValue}
          onChange={handleComparisonValueChange}
        />
      </div>
    </div>
  );
};

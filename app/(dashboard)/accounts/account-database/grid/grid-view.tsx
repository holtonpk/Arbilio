"use client";
import React from "react";
import DisplaySelector from "@/components/display-selector";
import { Icons } from "@/components/icons";
import { accountDatabaseConfig } from "@/config/dashboard";
import { Button } from "@/components/ui/button";
import { AccountCard } from "@/components/ui/account-card";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { AccountDataType } from "@/types";
import { LinkButton } from "@/components/ui/link";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";

import { Pagination } from "./pagination";

const GridView = ({
  data,
  displayType,
  setDisplayType,
  isDemo,
}: {
  data: AccountDataType[];
  displayType: "grid" | "columns";
  setDisplayType: React.Dispatch<React.SetStateAction<"grid" | "columns">>;
  isDemo?: boolean;
}) => {
  const sortOptions = accountDatabaseConfig.sortOptions;

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 16,
  });
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // Fetch the data from the server

  return (
    <>
      <div className="flex md:flex-row flex-col gap-2 w-full ">
        <form className=" bg-background rounded-md relative w-full h-fit ">
          <Icons.search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
          <Input
            placeholder="Search an user name. ex: @username"
            type="search"
            className=" w-full sm:pr-12 pl-10  text-primary"
            value={
              (table.getColumn("uniqueId")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("uniqueId")?.setFilterValue(event.target.value)
            }
          />
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="whitespace-nowrap">
              Sort by
              <Icons.chevronDown className={`ml-8 h-6 w-6 transition-all`} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortOptions.items.map((column) => {
              const Icon = Icons[column.icon as keyof typeof Icons];
              return (
                <DropdownMenuCheckboxItem
                  key={column.title}
                  className="capitalize"
                  checked={((column) =>
                    !!table.getColumn(column)?.getIsSorted())(column.value)}
                  onCheckedChange={() =>
                    table.getColumn(column.value)?.toggleSorting(true)
                  }
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {column.title}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DisplaySelector
          displayType={displayType}
          setDisplayType={setDisplayType}
        />
      </div>
      <div className="w-full mt-2  ">
        {isDemo ? (
          <>
            <div className="grid  lg:grid-cols-4  grid-cols-1 sm:grid-cols-2 gap-8 h-full  ">
              {table
                .getRowModel()
                .rows?.slice(0, table.getRowModel().rows.length - 4)
                .map((account: any, i: number) => (
                  <AccountCard key={i} item={account.original} />
                ))}
            </div>
            <div className="grid mt-8 lg:grid-cols-4  grid-cols-1 sm:grid-cols-2 gap-8 h-full  relative ">
              {table
                .getRowModel()
                .rows?.slice(
                  table.getRowModel().rows.length - 4,
                  table.getRowModel().rows.length
                )
                .map((account: any, i: number) => (
                  <AccountCard key={i} item={account.original} locked={true} />
                ))}

              <div className="absolute z-40 top-1/2 left-1/2 border -translate-x-1/2 -translate-y-1/2 hidden md:grid h-fit w-full max-w-lg scale-100  gap-4 bg-background p-6 opacity-100 shadow-lg animate-in fade-in-90 sm:rounded-lg sm:zoom-in-90  md:w-full">
                <div className="flex flex-col space-y-2 text-center sm:text-left items-center">
                  <h1 className="text-lg font-semibold">
                    Want access to over 1000+ accounts?
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Upgrade to premium to access our full database of accounts.
                  </p>
                  <LinkButton href={"/settings/upgrade"} className="w-fit mt-4">
                    Upgrade
                  </LinkButton>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid  lg:grid-cols-4  grid-cols-1 sm:grid-cols-2 gap-8 h-full  ">
            {table.getRowModel().rows?.map((account: any, i: number) => (
              <AccountCard key={account.id} item={account.original} />
            ))}
          </div>
        )}

        <Pagination table={table} />
      </div>
    </>
  );
};

export default GridView;

"use client";
import React from "react";
import DisplaySelector from "@/components/display-selector";
import { Icons } from "@/components/icons";
import { accountDatabaseConfig } from "@/config/dashboard";
import { Button } from "@/components/ui/button";
import { UpdateMultiCollectionButton } from "@/components/buttons/update-multi-collection-button";
import { CreateCollectionButton } from "@/components/buttons/create-collection-button";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/table/data-table-pagination";
import { LinkButton } from "@/components/ui/link";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { AccountDataType } from "@/types";

// Simulate a database read for tasks.

const TableView = ({
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
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const sortOptions = accountDatabaseConfig.sortOptions;

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const selectedRows = table.getSelectedRowModel();

  console.log("selectedRows", selectedRows);

  return (
    <>
      {selectedRows.rows.length > 0 && (
        <div className="fixed flex gap-8 items-center z-50 bottom-4  w-fit  scale-100  border bg-background p-4 opacity-100 shadow-lg animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 md:w-fit">
          <Button
            onClick={() => table.toggleAllRowsSelected(!!false)}
            variant={"destructive"}
          >
            X
          </Button>

          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row
            {table.getFilteredSelectedRowModel().rows.length > 1
              ? "s"
              : ""}{" "}
            selected.
          </div>

          <CreateCollectionButton
            variant="outline"
            accountArray={selectedRows.rows.map((row) => row.original.id)}
          >
            + New collection
          </CreateCollectionButton>

          <UpdateMultiCollectionButton
            accountArray={selectedRows.rows.map((row) => row.original.id)}
            setSelectedRows={() => table.toggleAllRowsSelected(!!false)}
          >
            Add to collection
          </UpdateMultiCollectionButton>
        </div>
      )}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
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
        <div className="space-y-4 w-full">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  <>
                    {isDemo &&
                    table.getState().pagination.pageIndex + 1 ==
                      table.getPageCount() ? (
                      <>
                        {table
                          .getRowModel()
                          .rows.slice(0, table.getRowModel().rows.length - 4)
                          .map((row) => (
                            <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                            >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        {table
                          .getRowModel()
                          .rows.slice(
                            table.getRowModel().rows.length - 4,
                            table.getRowModel().rows.length
                          )
                          .map((row) => (
                            <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                              locked={true}
                            >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                      </>
                    ) : (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
                {isDemo &&
                  table.getState().pagination.pageIndex + 1 ==
                    table.getPageCount() && (
                    <div className="absolute rounded-md border z-40 bottom-10 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:grid h-fit w-full max-w-lg scale-100  gap-4 bg-background p-6 opacity-100 shadow-lg   md:w-full">
                      <div className="flex flex-col space-y-2 text-center sm:text-left items-center">
                        <h1 className="text-lg font-semibold">
                          Want access to over 1000+ accounts?
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          Upgrade to premium to access our full database of
                          accounts.
                        </p>
                        <LinkButton
                          href={"/settings/upgrade"}
                          className="w-fit mt-4"
                        >
                          Upgrade
                        </LinkButton>
                      </div>
                    </div>
                  )}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={table} />
        </div>
      </div>
    </>
  );
};

export default TableView;

const DemoTable = ({ table }: { table: typeof Table }) => {
  return <></>;
};

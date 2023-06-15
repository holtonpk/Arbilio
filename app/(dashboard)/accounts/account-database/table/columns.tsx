"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatNumber } from "@/lib/utils";
import { AccountDataType } from "@/types";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { AccountDisplay, ProductDisplay } from "@/components/table-components";

export const columns: ColumnDef<AccountDataType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "account",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account" />
    ),
    cell: ({ row }) => (
      <div className="w-[250px]">
        <AccountDisplay item={row.original} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          {row.original.product && (
            <ProductDisplay productId={row.original.product as string} />
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "followerCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Followers" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {/* {formatNumber(row.original.accountStats[0].followerCount)} */}
          {formatNumber(row.getValue("followerCount"))}
        </div>
      );
    },
  },
  {
    accessorKey: "likeCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Likes" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {formatNumber(row.getValue("likeCount"))}
        </div>
      );
    },
  },
  {
    accessorKey: "postCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posts" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {formatNumber(row.getValue("postCount"))}
        </div>
      );
    },
  },
  {
    accessorKey: "daysTracked",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Days Tracked" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {formatNumber(row.getValue("daysTracked"))}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "mostViews",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Most Views" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {formatNumber(row.getValue("mostViews"))}
  //       </div>
  //     );
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

"use client";

import { Row } from "@tanstack/react-table";
import { Copy, MoreHorizontal, Pen, Star, Tags, Trash } from "lucide-react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { AccountDataType } from "@/types";
import CreateCollectionButton from "@/components/buttons/create-collection-button";

interface DataTableRowActionsProps<TData> {
  row: Row<AccountDataType>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // const task = taskSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        <UpdateCollectionButton
          account={{ id: row.original?.id }}
          variant={"ghost"}
          className="relative whitespace-nowrap justify-start h-fit flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
        >
          <Icons.add className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Add to collection
        </UpdateCollectionButton>
        <CreateCollectionButton
          accountArray={[row.original?.id]}
          variant={"ghost"}
          className="relative whitespace-nowrap justify-start flex h-fit cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
        >
          <Icons.addCollection className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Create collection
        </CreateCollectionButton>
        <DropdownMenuSeparator />
        <LinkButton
          variant={"ghost"}
          href={`/accounts/account/${row.original.id}`}
          className="relative whitespace-nowrap justify-start flex h-fit cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
        >
          <Icons.accounts className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          View Account
        </LinkButton>
        {row.original?.product && (
          <LinkButton
            variant={"ghost"}
            href={`/products/product/${row.original?.product?.id}`}
            className="relative whitespace-nowrap justify-start flex h-fit cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
          >
            <Icons.products className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            View Product
          </LinkButton>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

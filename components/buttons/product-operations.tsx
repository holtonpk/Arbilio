"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { ProductType, ProductDataBaseType } from "@/types";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/link";
import { TrackProductButton } from "@/components/buttons/track-product-button";

interface productOperationsProps extends ButtonProps {
  product: ProductType | ProductDataBaseType;
}

export function ProductOperations({
  product,
  variant,
  className,
  ...props
}: productOperationsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          className={cn(buttonVariants({ variant }), className)}
          {...props}
        />
        <span className="sr-only">Open</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <TrackProductButton
          product={product}
          variant={"ghost"}
          trackingVariant={"ghost"}
          className="relative whitespace-nowrap justify-start h-fit flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
        />

        <DropdownMenuSeparator />
        <LinkButton
          variant={"ghost"}
          href={`/products/product/${product.id}`}
          className="relative whitespace-nowrap justify-start flex h-fit cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
        >
          <Icons.products className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          View Product
        </LinkButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

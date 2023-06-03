"use client";
import { Button } from "@/components/ui/button";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogAction,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { ProductType, ProductDataBaseType } from "@/types";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UpdateCollectionButton } from "@/components/buttons/update-collection-button";
import { CreateCollectionButton } from "@/components/buttons/create-collection-button";
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
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [showUpdateName, setShowUpdateName] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = React.useState<boolean>(false);
  const nameRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
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
      {/* <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this collection?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      {/* <Dialog open={showUpdateName} onOpenChange={setShowUpdateName}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update collection name</DialogTitle>
            <DialogDescription>
              enter a new name for your collection
            </DialogDescription>
          </DialogHeader>
          <Input ref={nameRef} placeholder="Collection Name" />

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <DialogAction onClick={handleUpdateName} className="bg-primary">
              {isUpdateLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              <span>Update name</span>
            </DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </>
  );
}

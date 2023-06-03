"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { useUserProductTrack } from "@/context/user-product-track";

interface RemoveTrackProductButtonProps extends ButtonProps {
  id: string;
}

export function RemoveTrackProductButton({
  id,
  className,
  variant,
  ...props
}: RemoveTrackProductButtonProps) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const { unTrackProduct } = useUserProductTrack();

  const handleRemove = async () => {
    setIsDeleteLoading(true);

    await unTrackProduct(id);
    toast({
      title: "Product removed",
      description: "You are no longer tracking the product.",
      variant: "default",
    });

    setIsDeleteLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setShowDeleteAlert(!showDeleteAlert)}
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      />

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to stop tracking this product?
            </AlertDialogTitle>
            {/* <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription> */}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              className="bg-red-600 focus:ring-red-600 border-none"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              <span>Stop Tracking</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

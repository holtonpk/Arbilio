"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonVariants, ButtonProps } from "@/components/ui/button";
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
import { useUserCollections } from "@/context/user-collections";

// interface collectionOperationsProps {
//   collection: Pick<collection, "id" | "title">
// }

interface RemoveCollectionButtonProps extends ButtonProps {
  accountId: string;
  collectionId: string;
  hideItems?: (recordIdArray: string[]) => void;
}

export function RemoveCollectionButton({
  variant,
  size,
  className,
  accountId,
  collectionId,
  hideItems,
  ...props
}: RemoveCollectionButtonProps) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const { removeIdFromCollection } = useUserCollections();

  const handleRemove = async () => {
    setIsDeleteLoading(true);
    const res = await removeIdFromCollection(collectionId, accountId);
    if ("error" in res) {
      toast({
        title: "Error removing account",
        description: "There was an error removing your account.",
        variant: "destructive",
      });
    } else {
      hideItems && hideItems([accountId]);
      toast({
        title: "Successfully removed account",
        description: "The account has been removed from the collection.",
        variant: "default",
      });
    }

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
              Are you sure you want to remove this from the collection?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              // className="bg-red-600 focus:ring-red-600 border-none"
              className="bg-red-600 focus:ring-red-600 border"
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
      </AlertDialog>
    </>
  );
}

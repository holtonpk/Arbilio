"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useCollection from "@/hooks/use-collection";
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

// interface collectionOperationsProps {
//   collection: Pick<collection, "id" | "title">
// }

interface RemoveCollectionButtonProps {
  variant?: "default" | "outline" | "secondary";
  className?: string;
  size?: "sm" | "xsm" | "lg";
  accountId: string;
  collection: any;
  hideItems?: (recordIdArray: string[]) => void;
}

export function RemoveCollectionButton({
  variant,
  size,
  className,
  accountId,
  collection,
  hideItems,
}: RemoveCollectionButtonProps) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const { removeIdFromCollection } = useCollection();

  const handleRemove = async () => {
    console.log("=", collection, accountId);
    setIsDeleteLoading(true);
    const res = await removeIdFromCollection(collection.id, accountId);
    if (res?.error) {
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
      <Button
        onClick={() => setShowDeleteAlert(!showDeleteAlert)}
        className={cn(
          className,
          "flex items-center justify-center whitespace-nowrap hover:text-destructive"
        )}
        variant={variant}
        size={size}
      >
        <Icons.remove className="h-5 w-5 " />
      </Button>

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
      </AlertDialog>
    </>
  );
}

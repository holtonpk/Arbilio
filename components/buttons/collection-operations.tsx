"use client";

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
import useCollection from "@/hooks/use-collection";
import { CollectionType } from "@/types";

interface collectionOperationsProps {
  collection: CollectionType;
}

export function CollectionOperations({
  collection,
}: collectionOperationsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [showUpdateName, setShowUpdateName] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = React.useState<boolean>(false);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const { deleteCollection, updateAccountCollectionName } = useCollection();

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    console.log("id==>>", collection);
    const res = await deleteCollection(collection.id);
    setIsDeleteLoading(false);

    if (res?.error) {
      toast({
        title: "unable to delete collection",
        description: "There was an error deleting your collection.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Successfully deleted collection",
        description: "This collection has been deleted.",
        variant: "default",
      });
    }
  };

  const handleUpdateName = async () => {
    setIsUpdateLoading(true);
    const res = await updateAccountCollectionName(
      collection.id,
      nameRef.current?.value!
    );
    setIsUpdateLoading(false);
    if (res?.error) {
      toast({
        title: "unable to update collection name",
        description: "There was an error updating your collection name.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Successfully updated collection name",
        description: "This collection name has been updated.",
        variant: "default",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex cursor-pointer items-center "
            onSelect={() => setShowUpdateName(true)}
          >
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
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
      </AlertDialog>

      <Dialog open={showUpdateName} onOpenChange={setShowUpdateName}>
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
      </Dialog>
    </>
  );
}

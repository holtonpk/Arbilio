import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogAction,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { useUserCollections } from "@/context/user-collections";

interface CreateCollectionButtonProps {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost";
  accountArray?: string[];
}

const CreateCollectionButton = ({
  variant,
  accountArray,
}: CreateCollectionButtonProps) => {
  const [showCreateCollection, setShowCreateCollection] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const nameRef = React.useRef<HTMLInputElement>(null);

  // const { createCollection } = useUserCollections();
  const { createCollection, addIdToMultipleCollections } = useUserCollections();

  async function handleCreateCollection() {
    setIsLoading(true);
    const newCollection = await createCollection(nameRef.current?.value!, []);
    console.log("newCollection", newCollection);

    if ("error" in newCollection) {
      toast({
        title: "Error creating collection",
        description: "There was an error creating your collection.",
        variant: "destructive",
      });
    } else if ("success" in newCollection) {
      if (accountArray) {
        for (const accountId of accountArray) {
          const res = await addIdToMultipleCollections(
            [newCollection.docId],
            accountId
          );
          if ("error" in res) {
            toast({
              title: "Error updating to collection",
              description: "There was an error updating to your collection.",
              variant: "destructive",
            });
          }
        }
      }
      toast({
        title: "Successfully created collection",
        description: "This collection has been created.",
        variant: "default",
      });
    }

    setIsLoading(false);
    setShowCreateCollection(false);
  }

  return (
    <>
      <Button
        onClick={() => setShowCreateCollection(true)}
        className="flex items-center justify-center whitespace-nowrap capitalize"
        variant={variant}
        size="sm"
      >
        new collection
        <Icons.add className="h-5 w-5 mr-2" />
      </Button>
      <Dialog
        open={showCreateCollection}
        onOpenChange={setShowCreateCollection}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new collection</DialogTitle>
            <DialogDescription>
              enter a name for your new collection
            </DialogDescription>
          </DialogHeader>
          <Input ref={nameRef} placeholder="Collection Name" />

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <DialogAction
              onClick={handleCreateCollection}
              className="bg-primary"
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.add className="mr-2 h-4 w-4" />
              )}
              <span>Create </span>
            </DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateCollectionButton;

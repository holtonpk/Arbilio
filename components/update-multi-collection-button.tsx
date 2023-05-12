"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserCollections } from "@/context/user-collections";
import { Button } from "@/components/ui/button";
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
import { CollectionType } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import useCollection from "@/hooks/use-collection";

interface UpdateCollectionButtonProps {
  accountArray: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
}

export function UpdateMultiCollectionButton({
  accountArray,
  setSelectedRows,
}: UpdateCollectionButtonProps) {
  const [showCollectionUpdate, setShowCollectionUpdate] =
    React.useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setShowCollectionUpdate(true)}
        variant="outline"
        size="sm"
        className="flex items-center justify-center whitespace-nowrap gap-2"
      >
        <Icons.addCollection className="h-5 w-5 " />
        Add to a collection
      </Button>
      {showCollectionUpdate && (
        <UpdateDialog
          showCollectionUpdate={showCollectionUpdate}
          setShowCollectionUpdate={setShowCollectionUpdate}
          accountArray={accountArray}
          setSelectedRows={setSelectedRows}
        />
      )}
    </>
  );
}

interface UpdateDialogProps {
  showCollectionUpdate: boolean;
  setShowCollectionUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  accountArray: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
}

const UpdateDialog = ({
  showCollectionUpdate,
  setShowCollectionUpdate,
  accountArray,
  setSelectedRows,
}: UpdateDialogProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedCollections, setSelectedCollections] = React.useState<
    string[]
  >([]);

  const {
    addIdToMultipleCollections,
    findCollectionsContainingId,
    removeIdFromMultipleCollections,
  } = useCollection();

  const { userCollections } = useUserCollections();

  async function handleUpdateCollection() {
    setIsLoading(true);

    for (const accountId of accountArray) {
      const res = await addIdToMultipleCollections(
        selectedCollections,
        accountId
      );
      if (res?.error) {
        toast({
          title: "Error updating to collection",
          description: "There was an error updating to your collection.",
          variant: "destructive",
        });
      }
    }
    setSelectedRows([]);
    setIsLoading(false);
    toast({
      title: "Successfully updated collections!",
      description: "This post has been updated to your collection.",
      variant: "default",
    });
    setShowCollectionUpdate(false);
  }

  return (
    <Dialog open={showCollectionUpdate} onOpenChange={setShowCollectionUpdate}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Collection</DialogTitle>
          <DialogDescription>scroll to view all collections</DialogDescription>
        </DialogHeader>
        <div className="divide-y divide-border rounded-md border max-h-[200px] overflow-scroll">
          {userCollections &&
            userCollections.map((collection, i) => (
              <CollectionDisplay
                key={i}
                selectedCollections={selectedCollections}
                setSelectedCollections={setSelectedCollections}
                collection={collection}
              />
            ))}
        </div>

        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogAction onClick={handleUpdateCollection} className="bg-primary">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.add className="mr-2 h-4 w-4" />
            )}
            <span>add to collection</span>
          </DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface CollectionDisplayProps {
  collection: CollectionType;
  selectedCollections: string[];
  setSelectedCollections: (collections: string[]) => void;
}

const CollectionDisplay: React.FC<CollectionDisplayProps> = ({
  collection,
  selectedCollections,
  setSelectedCollections,
}) => {
  const [selected, setSelected] = React.useState(
    selectedCollections?.includes(collection.id)
  );

  const toggleSelected = () => {
    if (selectedCollections.includes(collection.id)) {
      setSelectedCollections(
        selectedCollections.filter((id) => id !== collection.id)
      );
      setSelected(false);
    } else {
      setSelectedCollections([...selectedCollections, collection.id]);
      setSelected(true);
    }
  };
  React.useEffect(() => {
    setSelected(selectedCollections?.includes(collection.id));
  }, [selectedCollections]);

  return (
    <div
      onClick={toggleSelected}
      className="flex gap-4 items-center p-2 pr-10 cursor-pointer"
    >
      <span className="aspect-square h-4 rounded-md flex items-center justify-center border">
        {selected && (
          <Icons.check className="h-5 w-5 text-primary" aria-hidden="true" />
        )}
      </span>
      <div className="grid gap-1">
        <h1 className="font-semibold">{collection.name}</h1>
        <div>
          <p className="text-sm text-muted-foreground">
            {collection?.ids.length} accounts
          </p>
        </div>
      </div>
    </div>
  );
};

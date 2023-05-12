"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserCollections } from "@/context/user-collections";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useCollection from "@/hooks/use-collection";

interface UpdateCollectionButtonProps {
  variant?: "default" | "outline" | "secondary";
  className?: string;
  size?: "sm" | "xsm" | "lg";
  account: any;
}

export function UpdateCollectionButton({
  variant,
  size,
  className,
  account,
}: UpdateCollectionButtonProps) {
  const [showCollectionUpdate, setShowCollectionUpdate] =
    React.useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setShowCollectionUpdate(true)}
        className={cn(
          className,
          "flex items-center justify-center whitespace-nowrap"
        )}
        variant={variant}
        size={size}
      >
        <Icons.addCollection className="h-5 w-5 " />
      </Button>
      {showCollectionUpdate && (
        <UpdateDialog
          showCollectionUpdate={showCollectionUpdate}
          setShowCollectionUpdate={setShowCollectionUpdate}
          account={account}
        />
      )}
    </>
  );
}

interface UpdateDialogProps {
  showCollectionUpdate: boolean;
  setShowCollectionUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  account: any;
}

const UpdateDialog = ({
  showCollectionUpdate,
  setShowCollectionUpdate,
  account,
}: UpdateDialogProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentCollections, setCurrentCollections] = React.useState<string[]>(
    []
  );
  const [selectedCollections, setSelectedCollections] = React.useState<
    string[]
  >([]);

  const {
    addIdToMultipleCollections,
    findCollectionsContainingId,
    removeIdFromMultipleCollections,
  } = useCollection();

  const { userCollections } = useUserCollections();

  React.useEffect(() => {
    async function fetchActiveCollections() {
      const activeCollections = await findCollectionsContainingId(
        account.recordId
      );
      setSelectedCollections(activeCollections.data);
      setCurrentCollections(activeCollections.data);
    }
    fetchActiveCollections();
  }, []);

  async function handleUpdateCollection() {
    setIsLoading(true);
    const newCollections: any[] = selectedCollections.filter((collection) => {
      return !currentCollections.includes(collection);
    });

    const oldCollections: any[] = currentCollections.filter((collection) => {
      return !selectedCollections.includes(collection);
    });

    const res = await addIdToMultipleCollections(
      newCollections,
      account.recordId
    );

    const res2 = await removeIdFromMultipleCollections(
      oldCollections,
      account.recordId
    );

    setIsLoading(false);

    if (res?.error || res2?.error) {
      toast({
        title: "Error updating to collection",
        description: "There was an error updating to your collection.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Successfully updated collections!",
        description: "This post has been updated to your collection.",
        variant: "default",
      });
      setShowCollectionUpdate(false);
    }
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
            <span>add to collection </span>
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

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
import { ButtonProps, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface UpdateCollectionButtonProps extends ButtonProps {
  account: any;
}

export function UpdateCollectionButton({
  account,
  className,
  variant,
  ...props
}: UpdateCollectionButtonProps) {
  const [showCollectionUpdate, setShowCollectionUpdate] =
    React.useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowCollectionUpdate(true)}
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      />
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
    userCollections,
    addIdToMultipleCollections,
    findCollectionsContainingId,
    removeIdFromMultipleCollections,
  } = useUserCollections();

  React.useEffect(() => {
    async function fetchActiveCollections() {
      const activeCollections = await findCollectionsContainingId(account.id);
      setSelectedCollections(activeCollections.data);
      setCurrentCollections(activeCollections.data);
    }
    fetchActiveCollections();
  }, [account, findCollectionsContainingId]);

  async function handleUpdateCollection() {
    setIsLoading(true);
    const newCollections: any[] = selectedCollections.filter((collection) => {
      return !currentCollections.includes(collection);
    });

    const oldCollections: any[] = currentCollections.filter((collection) => {
      return !selectedCollections.includes(collection);
    });

    console.log("newCollections", newCollections);
    console.log("oldCollections", newCollections);

    const res = await addIdToMultipleCollections(newCollections, account.id);

    const res2 = await removeIdFromMultipleCollections(
      oldCollections,
      account.id
    );

    setIsLoading(false);

    if ("error" in res || "error" in res2) {
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
          <DialogDescription>
            select a collection to add or deselect to remove
          </DialogDescription>
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
              <Icons.update className="mr-2 h-4 w-4" />
            )}
            <span>update collections</span>
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
    if (selected) {
      setSelectedCollections(
        selectedCollections.filter((id) => id !== collection.id)
      );
      // setSelected(false);
    } else {
      setSelectedCollections([...selectedCollections, collection.id]);
      // setSelected(true);
    }
  };

  React.useEffect(() => {
    setSelected(selectedCollections?.includes(collection.id));
  }, [selectedCollections, collection.id]);

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

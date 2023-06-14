"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserData } from "@/context/user-data";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { CollectionOperations } from "./collection-operations";
import { ScrollArea } from "../ui/scroll-area";

interface UpdateCollectionButtonProps extends ButtonProps {
  account: any;
}

export function UpdateCollectionButton({
  account,
  className,
  variant,
  ...props
}: UpdateCollectionButtonProps) {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const { userCollections } = useUserData();

  const [createNewCollection, setCreateNewCollection] =
    React.useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      />
      {setShowModal && (
        <>
          {createNewCollection ? (
            <NewCollections
              setShowModal={setShowModal}
              showModal={showModal}
              account={account}
              setCreateNewCollection={setCreateNewCollection}
            />
          ) : userCollections && userCollections.length > 0 ? (
            <UpdateDialog
              setShowModal={setShowModal}
              showModal={showModal}
              account={account}
              setCreateNewCollection={setCreateNewCollection}
            />
          ) : (
            <NewCollections
              setShowModal={setShowModal}
              showModal={showModal}
              account={account}
              setCreateNewCollection={setCreateNewCollection}
            />
          )}
        </>
      )}
    </>
  );
}

const NewCollections = ({
  account,
  showModal,
  setShowModal,
  setCreateNewCollection,
}: {
  account: any;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setCreateNewCollection: (show: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const nameRef = React.useRef<HTMLInputElement>(null);

  // const { createCollection } = useUserData();
  const { createCollection, addIdToMultipleCollections } = useUserData();

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
      if (account) {
        const res = await addIdToMultipleCollections(
          [newCollection.docId],
          account.id
        );
        if ("error" in res) {
          toast({
            title: "Error updating to collection",
            description: "There was an error updating to your collection.",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "Successfully created collection",
        description: "This collection has been created.",
        variant: "default",
      });
      setIsLoading(false);
      setShowModal(false);
      setCreateNewCollection(false);
    }
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new collection</DialogTitle>
          <DialogDescription>
            enter a name for your new collection
          </DialogDescription>
        </DialogHeader>
        <Input ref={nameRef} placeholder="Collection Name" />

        <DialogFooter>
          <DialogClose onClick={() => setCreateNewCollection(false)}>
            Cancel
          </DialogClose>
          <DialogAction onClick={handleCreateCollection} className="bg-primary">
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
  );
};

interface UpdateDialogProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  account: any;
  setCreateNewCollection: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateDialog = ({
  showModal,
  setShowModal,
  account,
  setCreateNewCollection,
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
  } = useUserData();

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
      setShowModal(false);
    }
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Collection</DialogTitle>
          <DialogDescription>
            select a collection to add or deselect to remove
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className=" max-h-[250px] border rounded-md">
          <div className="divide-y  divide-border   h-fit ">
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
        </ScrollArea>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogAction
            onClick={() => setCreateNewCollection(true)}
            variant={"secondary"}
          >
            <Icons.add className="mr-2 h-4 w-4" />
            <span>New collection </span>
          </DialogAction>
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
      className="flex justify-between w-full  items-center p-2  cursor-pointer"
    >
      <div className="flex gap-4 w-fit items-center">
        <Checkbox checked={selected} />
        <div className="grid gap-1">
          <h1 className="font-semibold">{collection.name}</h1>
          <div>
            <p className="text-sm text-muted-foreground">
              {collection?.ids.length} accounts
            </p>
          </div>
        </div>
      </div>
      <CollectionOperations variant={"ghost"} collection={collection}>
        <Icons.ellipsis className="h-5 w-5 text-muted-foreground" />
      </CollectionOperations>
    </div>
  );
};

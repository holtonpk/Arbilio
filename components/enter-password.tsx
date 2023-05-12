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

import { Input } from "./ui/input";
import React from "react";
import { Icons } from "./icons";

interface EnterPasswordProps {
  ref: React.Ref<HTMLInputElement>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EnterPasswordModal = ({
  ref,
  showModal,
  setShowModal,
}: EnterPasswordProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter password to save changes</DialogTitle>
          <DialogDescription>
            please verify your password to save changes to your account
          </DialogDescription>
        </DialogHeader>
        <Input ref={ref} placeholder="password" type="password" />

        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogAction className="bg-primary">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnterPasswordModal;

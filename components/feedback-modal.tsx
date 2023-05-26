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
import { Icons } from "@/components/icons";
import { useAuth } from "@/context/Auth";
import { db } from "@/context/Auth";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "./ui/use-toast";

const Feedback = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { currentUser } = useAuth()!;

  const submitFeedback = async () => {
    setIsLoading(true);
    await addDoc(collection(db, "user-feedback"), {
      feedback: inputRef.current?.value,
      user: currentUser?.uid,
      createdAt: new Date(),
    });
    setIsLoading(false);
    setShowModal(false);
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center whitespace-nowrap capitalize"
        size="sm"
        variant={"outline"}
      >
        Feedback
      </Button>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Feedback</DialogTitle>
            <DialogDescription>
              We&apos;d love to hear your thoughts on how we can improve.
            </DialogDescription>
          </DialogHeader>
          <textarea
            ref={inputRef}
            className="w-full h-32 p-4 border rounded-md"
            placeholder="Enter your feedback here..."
          />

          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <DialogAction onClick={submitFeedback} className="bg-primary">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.send className="mr-2 h-4 w-4" />
              )}
              <span>Submit</span>
            </DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Feedback;

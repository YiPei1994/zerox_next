"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { completeSession, deleteSession } from "@/lib/actions/session";
import { SessionData } from "@/types/types";

import { CiSquareCheck } from "react-icons/ci";
import { RiDeleteBin4Line } from "react-icons/ri";

type SessionItemHeaderProps = {
  session: SessionData;
};
export default function SessionItemHeader({ session }: SessionItemHeaderProps) {
  const { toast } = useToast();
  async function handleComplete() {
    const { status, message } = await completeSession(
      session._id,
      !session.active
    );
    toast({
      title: status,
      description: message,
    });
  }
  async function handleDelete() {
    const { status, message } = await deleteSession(session._id);
    toast({
      title: status,
      description: message,
    });
  }
  return (
    <div className="flex gap-4 items-center justify-between pb-4">
      <form action={handleComplete}>
        <Button className="text-2xl text-primary p-0" variant="ghost">
          <CiSquareCheck />
        </Button>
      </form>
      <h4 className="text-xl font-bold flex-auto">{session.note}</h4>

      <AlertDialog>
        <Button className="text-2xl text-primary p-0" asChild variant="ghost">
          <AlertDialogTrigger>
            <RiDeleteBin4Line />
          </AlertDialogTrigger>
        </Button>
        <AlertDialogContent className="w-[90%] mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              asChild
              onClick={() => handleDelete()}
            >
              <AlertDialogAction>Delete</AlertDialogAction>
            </Button>{" "}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

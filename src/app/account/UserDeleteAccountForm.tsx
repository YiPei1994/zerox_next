"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { userSignOut } from "@/lib/actions/auth";
import { userDeleteAccount } from "@/lib/actions/user";

export default function UserDeleteAccountForm() {
  async function handleDelete() {
    await userDeleteAccount();
    await userSignOut();
  }
  return (
    <div className="w-full my-4 justify-center items-center flex">
      <AlertDialog>
        <Button asChild variant="destructive" className="w-2/4">
          <AlertDialogTrigger>Delete account</AlertDialogTrigger>
        </Button>
        <AlertDialogContent className="w-[90%] mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently make your account inactive.
            </AlertDialogDescription>
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

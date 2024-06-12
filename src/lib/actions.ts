"use server";

import { signIn, signOut } from "./auth";
import dbConnect from "./mongodb";

/////////////////////// auth /////////////////////////////////////////////////
export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
///////////////////////// auth end ////////////////////////////////////////

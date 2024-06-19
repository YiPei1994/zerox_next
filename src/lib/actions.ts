"use server";

import User from "@/models/user";
import { signIn, signOut } from "./auth";
import { hashAndSalt } from "./helpers";

/////////////////////// auth /////////////////////////////////////////////////
export async function userSignIn(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const hashedPass = await hashAndSalt(String(password));

    console.log(email, hashedPass);
    /*    const user = await User.find({ email, password });

    if (!user) {
      throw new Error("no user was found.");
    } */
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}
///////////////////////// auth end ////////////////////////////////////////

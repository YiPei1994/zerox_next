"use server";

import { signIn, signOut } from "./auth";

import { findUserByEmailAndPass } from "./data-servise";

/////////////////////// auth /////////////////////////////////////////////////
export async function signInFormAction(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    crsfToken: formData.get("crsfToken"),
  };

  const user = await findUserByEmailAndPass(data.email, data.password);
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}
///////////////////////// auth end ////////////////////////////////////////

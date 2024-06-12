"use server";

import { signIn, signOut } from "./auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

/////////////////////// auth /////////////////////////////////////////////////
export async function signInFormAction(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    crsfToken: formData.get("csrfToken"),
  };

  try {
    // This will redirect immediately on login success
    const user = await signIn("credentials", data);
    console.log(user);
    if (user) {
      redirect("/");
    }
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }

    console.log("error", e);
    return {
      status: "error",
    };
  }
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
///////////////////////// auth end ////////////////////////////////////////

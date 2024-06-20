"use server";
import User from "@/models/user";
import { signIn, signOut } from "./auth";
import { findUserByEmail } from "./data-servise";
import { correctPassword, createToken, hashAndSalt } from "./helpers";
import { formSignInSchema, formSignUpSchema } from "./zodSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/////////////////////// auth /////////////////////////////////////////////////
export async function userSignIn(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    // 1. always do serverr validation here
    const parsed = formSignInSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Invalid form data.");
    }

    // 2. find user and verify if user exists

    const user = await findUserByEmail(parsed.data.email);

    if (!user) {
      throw new Error("User not found");
    }

    if (!(await correctPassword(parsed.data.password, user.password))) {
      throw new Error("Password is not match.");
    }

    // 3. create token
    const token = createToken(user._id);

    // 4. set cookies
    cookies().set("session", token, { httpOnly: true });
  } catch (err) {
    console.error(err);
    throw err;
  }
  redirect("/account");
}

export async function userSignUp(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    // 1. always do serverr validation here
    const parsed = formSignUpSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Invalid form data.");
    }

    // 2. hash password and create a user on server
    const hashPassword = await hashAndSalt(parsed.data.password);
    const email = parsed.data.email;
    const newUser = {
      email,
      password: hashPassword,
      createdFrom: "email",
    };
    const user = await User.create(newUser);

    if (!user) {
      throw new Error("Failed to create user.");
    }

    const token = createToken(user._id);

    // 4. set cookies
    cookies().set("session", token, { httpOnly: true });
  } catch (err) {
    console.error(err);
    throw err;
  }
  redirect("/accont");
}

export async function userSignOut() {
  cookies().set("session", "");
  redirect("/login");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}
///////////////////////// auth end ////////////////////////////////////////

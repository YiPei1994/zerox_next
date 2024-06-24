"use server";

import User from "@/models/user";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { findUserById } from "../data-servise";
import { correctPassword, hashAndSalt, verifyToken } from "../helpers";
import { formUserDataSchema, formUserPasswordSchema } from "../zodSchema";

export const userUpdateData = async (formData: FormData) => {
  try {
    // 1. Validate form data
    const data = Object.fromEntries(formData);
    const parsed = formUserDataSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Invalid email address. Please try again."); // More specific message
    }

    // 2. check if user is authenticated , logged or exists
    const cookie = cookies().get("session")?.value;
    if (!cookie) {
      throw new Error("No login found, please relog.");
    }
    const { id } = verifyToken(cookie);
    await User.findByIdAndUpdate(id, parsed.data);

    revalidatePath("/account");
    return { status: "success", message: "User updated!" };
  } catch (error) {
    console.error("Error during update user request:", error); // Log error for debugging

    // Return a generic error message to avoid revealing sensitive details
    return {
      status: "fail",
      message: "An error occurred. Please try again later.",
    };
  }
};

export const userUpdatePassword = async (formData: FormData) => {
  try {
    // 1. sanitazing data
    const data = Object.fromEntries(formData);
    const parsed = formUserPasswordSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Invalid email address. Please try again.");
    }

    // 2. get logged user
    const cookie = cookies().get("session")?.value;
    if (!cookie) {
      throw new Error("No login found, please relog.");
    }
    const { id } = verifyToken(cookie);
    const user = await findUserById(id);

    // 3. check if oldpassowrd is correct

    if (parsed.data.oldPassword && user) {
      const exist = await correctPassword(
        parsed.data.oldPassword,
        user?.password
      );

      if (!exist) {
        throw new Error("old password is not correct");
      }
    }

    // 4. hash password

    const hashPass = await hashAndSalt(parsed.data.password);

    await User.findByIdAndUpdate(id, { password: hashPass });

    return { status: "success", message: "User password updated!" };
  } catch (error) {
    console.error("Error during update user password request:", error); // Log error for debugging

    // Return a generic error message to avoid revealing sensitive details
    return {
      status: "fail",
      message: "An error occurred. Please try again later.",
    };
  }
};

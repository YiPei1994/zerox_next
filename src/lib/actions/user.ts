"use server";

import { cookies } from "next/headers";
import { formUserDataSchema } from "../zodSchema";
import { verifyToken } from "../helpers";
import User from "@/models/user";

export const userUpdateData = async (formData: FormData) => {
  try {
    // 1. Validate form data
    const data = Object.fromEntries(formData);
    const parsed = formUserDataSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Invalid email address. Please try again."); // More specific message
    }
    console.log(parsed);

    // 2. check if user is authenticated , logged or exists
    const cookie = cookies().get("session")?.value;
    if (!cookie) {
      throw new Error("No login found, please relog.");
    }
    const { id } = verifyToken(cookie);
    await User.findByIdAndUpdate(id, parsed.data);

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

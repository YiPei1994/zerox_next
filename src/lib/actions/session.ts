"use server";

import { revalidatePath } from "next/cache";
import { userAuthenticated, verifyUserFromCookie } from "./user";
import Session from "@/models/session";

export const createSession = async (formData: FormData) => {
  try {
    // check if user is logged in
    const user = await verifyUserFromCookie();
    if (!user) {
      throw new Error("User not found.");
    }
    // get form data
    const note = formData.get("note") as string;
    const exercises = JSON.parse(formData.get("exercises") as string);

    const arrayObj = exercises.map((ex: string) => ({
      name: ex.trim(),
    }));

    const newSession = {
      userId: user._id,
      note,
      exercises: arrayObj,
    };

    const sessions = await Session.create(newSession);
    console.log(sessions);
  } catch (error) {}
};

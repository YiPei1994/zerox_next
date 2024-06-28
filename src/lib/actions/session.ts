"use server";

import Session from "@/models/session";
import { SessionData } from "@/types/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { bsonParser } from "../helpers";
import { verifyUserFromCookie } from "./user";
import { PAGE_LIMIT } from "../constants";

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
      exerciseId: ex.trim(),
    }));

    const newSession = {
      userId: user._id,
      note,
      exercises: arrayObj,
    };

    await Session.create(newSession);

    revalidatePath("/sessions");
  } catch (error) {
    console.error(error);
    throw error;
  }
  redirect("/sessions");
};

export const getSessionsForPage = async (page: number = 1) => {
  try {
    // 1. get logged user
    const user = await verifyUserFromCookie();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // 2. pagination

    const skip = (page - 1) * PAGE_LIMIT;
    // 3. read limited sessions belongs to user
    const sessions = await Session.find({
      userId: user._id,
      active: false,
    })
      .populate({
        path: "exercises.exerciseId",
        select: "name category",
      })
      .sort("-createdAt")
      .skip(skip)
      .limit(PAGE_LIMIT);

    // 3. Parse the result (if necessary)
    const parsed: SessionData[] = bsonParser(sessions);

    return parsed;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

export const getActiveSessions = async () => {
  try {
    // 1. get logged user
    const user = await verifyUserFromCookie();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // 2. pagination

    const sessions = await Session.find({
      userId: user._id,
      active: true,
    }).populate({
      path: "exercises.exerciseId",
      select: "name category",
    });

    // 3. Parse the result (if necessary)
    const parsed: SessionData[] = bsonParser(sessions);

    return parsed;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

export const updateSessionExercise = async (formData: FormData) => {
  try {
    // parse data
    const data = Object.fromEntries(formData);
    const setsData = {
      exerciseId: data.exerciseId,
      sets: parseInt(data.sets as string),
      unit: data.unit,
      setsData: JSON.parse(String(data.setsData)),
    };

    // check if user is authenticated
    const user = await verifyUserFromCookie();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // find the right session and update the specific exercise
    const session = await Session.findOneAndUpdate(
      {
        _id: data.id,
        "exercises.exerciseId": data.exerciseId,
      },
      {
        $set: {
          "exercises.$": setsData,
        },
      },
      { new: true } // This option returns the updated document
    );

    if (!session) {
      throw new Error("Session not found or exercise not in session");
    }

    revalidatePath("/sessions");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const completeSession = async (id: string, active: boolean) => {
  try {
    // verify if user is logged in
    const user = await verifyUserFromCookie();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // check if session belongs to same user
    const sessionData = await Session.findById<SessionData>(id);
    const session = bsonParser(sessionData);

    if (session?.userId !== user._id) {
      throw new Error("This session does not belong to same user.");
    }

    await Session.findByIdAndUpdate(id, { active });
    revalidatePath("/sessions");
    return { status: "success", message: "Success" };
  } catch (error) {
    console.error("Error during user completing session:", error); // Log error for debugging

    // Return a generic error message to avoid revealing sensitive details
    return {
      status: "fail",
      message: "An error occurred. Please try again later.",
    };
  }
};

export const deleteSession = async (id: string) => {
  try {
    // verify if user is logged in
    const user = await verifyUserFromCookie();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // check if session belongs to same user
    const sessionData = await Session.findById<SessionData>(id);
    const session = bsonParser(sessionData);

    if (session?.userId !== user._id) {
      throw new Error("This session does not belong to same user.");
    }

    await Session.findByIdAndDelete(id);
    revalidatePath("/sessions");
    return { status: "success", message: "Success" };
  } catch (error) {
    console.error("Error during user deleting session:", error); // Log error for debugging

    // Return a generic error message to avoid revealing sensitive details
    return {
      status: "fail",
      message: "An error occurred. Please try again later.",
    };
  }
};

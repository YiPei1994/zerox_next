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

export const updateSessionExercise = async (formData: FormData) => {
  // parse data
  const data = Object.fromEntries(formData);
  const setsData = {
    exerciseId: data.exerciseId,
    sets: parseInt(data.sets as string),
    unit: data.unit,
    setsData: JSON.parse(String(data.setsData)),
  };

  console.log(setsData);

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

  console.log(session);
};

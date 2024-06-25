"use server";

import Exercise, { IExercise } from "@/models/exercise";
import { bsonParser } from "../helpers";
import { ExerciseClient } from "@/types/types";

export const getAllExercises = async () => {
  try {
    const exercisesData = await Exercise.find<IExercise>();

    const exercises: ExerciseClient[] = bsonParser(exercisesData);

    return exercises;
  } catch (error) {}
};

export const getExercise = async (id: string) => {
  try {
    const exerciseData = await Exercise.findById(id);
    const exercise: ExerciseClient = bsonParser(exerciseData);
    return exercise;
  } catch (error) {}
};

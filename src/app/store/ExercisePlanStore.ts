import { ExerciseClient } from "@/types/types"; // Assuming correct path
import { create } from "zustand";

type ExercisePlan = {
  exercises: ExerciseClient[];
  addExercise: (exercise: ExerciseClient) => void;
  removeExercise: (exerciseId: string) => void;
  emptyExercises: () => void;
};

export const useExercisePlan = create<ExercisePlan>((set) => ({
  exercises: [],
  addExercise: (exercise) =>
    set((state) => ({ exercises: [...state.exercises, exercise] })),
  removeExercise: (exerciseId) =>
    set((state) => ({
      exercises: state.exercises.filter(
        (exercise) => exercise._id !== exerciseId
      ),
    })),
  emptyExercises: () => set({ exercises: [] }),
}));

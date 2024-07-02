import { getAllExercises } from "@/lib/actions/exercise";
import ExerciseItem from "./ExerciseItem";
import { ExerciseClient } from "@/types/types";

type ExercisesListProps = {
  filter: string;
};

export default async function ExercisesList({ filter }: ExercisesListProps) {
  const exercises = await getAllExercises();
  if (!exercises) return;
  let filteredExercises: ExerciseClient[] = [];
  if (filter === "all") filteredExercises = exercises;
  if (filter === "chest")
    filteredExercises = exercises.filter(
      (exe) => exe.primaryMuscles[0] === "chest"
    );
  if (filter === "shoulders")
    filteredExercises = exercises.filter(
      (exe) => exe.primaryMuscles[0] === "shoulders"
    );
  if (filter === "triceps")
    filteredExercises = exercises.filter(
      (exe) => exe.primaryMuscles[0] === "triceps"
    );
  if (filter === "biceps")
    filteredExercises = exercises.filter(
      (exe) => exe.primaryMuscles[0] === "biceps"
    );
  if (filter === "abs")
    filteredExercises = exercises.filter(
      (exe) => exe.primaryMuscles[0] === "abdominals"
    );
  if (filter === "quadriceps")
    filteredExercises = exercises.filter(
      (exe) => exe.primaryMuscles[0] === "quadriceps"
    );
  return (
    <>
      {filteredExercises?.map((exercise) => (
        <ExerciseItem key={exercise._id} exercise={exercise} />
      ))}
    </>
  );
}

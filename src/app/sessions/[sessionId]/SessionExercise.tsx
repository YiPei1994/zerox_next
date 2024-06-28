import { ExerciseData } from "@/types/types";
import SessionItemData from "../SessionItemData";
import ExerciseInfo from "@/app/exercises/[exerciseId]/ExerciseInfo";

type SessionExerciseProps = {
  exercise: ExerciseData;
};

export default function SessionExercise({ exercise }: SessionExerciseProps) {
  return (
    <div className="my-4 flex flex-col gap-4">
      <ExerciseInfo exercise={exercise.exerciseId} />
      <SessionItemData exerciseData={exercise} />
    </div>
  );
}

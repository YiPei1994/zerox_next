import { getAllExercises } from "@/lib/actions/exercise";
import ExerciseItem from "./ExerciseItem";
import { cookies } from "next/headers";

export default async function ProductsPage() {
  const exercises = await getAllExercises();

  return (
    <div>
      {exercises?.map((exercises) => (
        <ExerciseItem key={exercises._id} exercise={exercises} />
      ))}
    </div>
  );
}

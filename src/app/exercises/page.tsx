import { getAllExercises } from "@/lib/data-servise";
import ExerciseItem from "./ExerciseItem";

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

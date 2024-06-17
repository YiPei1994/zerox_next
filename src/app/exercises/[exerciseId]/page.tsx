import ImageWrapper from "@/components/ImageWrapper";
import { getExercises } from "@/lib/data-servise";
import ExerciseInfo from "./ExerciseInfo";
import ExerciseTabs from "./ExerciseTabs";
import ExerciseImageCarousel from "./ExerciseImageCarousel";

export default async function page({
  params,
}: {
  params: { exerciseId: string };
}) {
  const exercise = await getExercises(params.exerciseId);
  if (!exercise) return;

  const { name, instructions } = exercise;

  return (
    <div>
      <ExerciseImageCarousel name={name} />
      <div className="my-4">
        <ExerciseInfo exercise={exercise} />

        <ExerciseTabs instructions={instructions} />
      </div>
    </div>
  );
}

import ImageWrapper from "@/components/ImageWrapper";

import ExerciseInfo from "./ExerciseInfo";
import ExerciseTabs from "./ExerciseTabs";
import ExerciseImageCarousel from "./ExerciseImageCarousel";
import { getExercise } from "@/lib/actions/exercise";
import NavBack from "@/components/NavBack";

export default async function page({
  params,
}: {
  params: { exerciseId: string };
}) {
  const exercise = await getExercise(params.exerciseId);
  if (!exercise) return;

  const { name, instructions } = exercise;

  return (
    <>
      <NavBack />
      <div>
        <ExerciseImageCarousel name={name} />
        <div className="my-4">
          <ExerciseInfo exercise={exercise} />

          <ExerciseTabs instructions={instructions} />
        </div>
      </div>
    </>
  );
}

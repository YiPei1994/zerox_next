import NavBack from "@/components/NavBack";
import { getExercise } from "@/lib/actions/exercise";
import { Metadata } from "next";
import ExerciseImageCarousel from "./ExerciseImageCarousel";
import ExerciseInfo from "./ExerciseInfo";
import ExerciseTabs from "./ExerciseTabs";

export const metadata: Metadata = {
  title: {
    template: "%s : The Exercise Note",
    default: "Zerox : The Exercise Note",
  },
  description: "Personal exercise data recording note.",
};

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

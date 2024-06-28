import ExerciseImageCarousel from "@/app/exercises/[exerciseId]/ExerciseImageCarousel";
import ExerciseInfo from "@/app/exercises/[exerciseId]/ExerciseInfo";
import NavBack from "@/components/NavBack";
import { getUserSession } from "@/lib/actions/session";
import { ExerciseData } from "@/types/types";
import SessionExercise from "./SessionExercise";

export default async function page({
  params,
}: {
  params: { sessionId: string };
}) {
  const id = params.sessionId;

  const session = await getUserSession(id);
  const { note, exercises } = session;

  return (
    <>
      <NavBack />
      <div>
        {exercises.map((exercise) => (
          <SessionExercise key={exercise.exerciseId._id} exercise={exercise} />
        ))}
      </div>
    </>
  );
}

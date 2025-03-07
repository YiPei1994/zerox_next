"use client";
import ImageWraper from "@/components/ImageWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExerciseClient } from "@/types/types";
import { GrPlan } from "react-icons/gr";

import Link from "next/link";
import { GrHelpBook } from "react-icons/gr";
import { useExercisePlan } from "@/store/ExercisePlanStore";

type ExerciseItemProps = {
  exercise: ExerciseClient;
};
export default function ExerciseItem({ exercise }: ExerciseItemProps) {
  const { _id, name, force, level, primaryMuscles, equipment, mechanic } =
    exercise;
  const imagePath = `/exercises/${name
    .replaceAll(" ", "_")
    .replaceAll("/", "_")}/images/0.jpg`;
  const { exercises, addExercise } = useExercisePlan();
  const exist = exercises.some((exercise) => exercise._id === _id);
  return (
    <div className="group flex flex-col gap-4">
      <ImageWraper
        name={name}
        imagePath={imagePath}
        className="h-48"
        imageClassName="skew-y-6"
      />
      <div className="m-4 relative flex flex-col gap-4">
        <h4 className="absolute bg-primary text-accent text-2xl max-md:truncate max-md:max-w-[365px] break-all font-bolder px-4 py-2 -top-[65px] translate-x-[-50%] left-[50%] uppercase w-max skew-x-6">
          {name}
        </h4>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <span className="text-xs">Type: </span>
            <Badge variant="secondary">{force}</Badge>

            <Badge variant="secondary">{equipment}</Badge>
            <Badge variant="secondary">{mechanic}</Badge>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-xs">Diff: </span>
            <Badge variant="secondary">{level}</Badge>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-xs">Muscles: </span>
            <Badge variant="secondary">{primaryMuscles}</Badge>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Button className="w-min">
            <Link
              className="flex gap-4 items-center"
              href={`/exercises/${_id}`}
            >
              <GrHelpBook />
              <span>More detail</span>{" "}
            </Link>
          </Button>
          <Button
            onClick={() => addExercise(exercise)}
            disabled={exist}
            className="w-min flex gap-4 items-center"
          >
            <GrPlan />
            <span>{exist ? "Added" : "Add to plan"}</span>{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}

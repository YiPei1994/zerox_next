"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

import { useExercisePlan } from "@/store/ExercisePlanStore";
import { CiCircleRemove } from "react-icons/ci";
import { GrPlan } from "react-icons/gr";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createSession } from "@/lib/actions/session";

export default function ExercisePlan() {
  const { exercises, removeExercise, emptyExercises } = useExercisePlan();
  const exerciseNames = exercises.map((exer) => exer.name);

  return (
    <Drawer>
      {exercises.length > 0 && (
        <DrawerTrigger>
          {" "}
          <div className="relative py-3 px-4 bg-primary text-accent rounded-l-md text-2xl border border-s-accent">
            <GrPlan />

            <p className="absolute bg-accent text-sm top-5 right-1 w-5 h-5 rounded-full text-primary">
              {exercises.length}
            </p>
          </div>
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Exercise Plan</DrawerTitle>
        </DrawerHeader>
        <form
          className="p-4 mx-auto w-full flex flex-col gap-4"
          action={createSession}
          method="POST"
        >
          <Input
            placeholder="Insert name or note for this session."
            name="note"
            defaultValue=""
            type="text"
          />
          <input
            type="hidden"
            name="exercises"
            defaultValue={JSON.stringify(exerciseNames)}
          />
          <div className="my-4 flex w-full  px-4 flex-col gap-3">
            {exercises.map((exercise, i) => (
              <div
                className="flex gap-2 items-center justify-between"
                key={exercise._id}
              >
                <span>{exercise.name}</span>/
                <span>{exercise.primaryMuscles[0]} </span>{" "}
                <button
                  className="text-xl text-primary"
                  onClick={() => removeExercise(exercise._id!)}
                >
                  <CiCircleRemove />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-around">
            <Button type="submit">Submit</Button>
            <Button asChild type="reset" onClick={() => emptyExercises()}>
              <DrawerClose>Empty</DrawerClose>
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

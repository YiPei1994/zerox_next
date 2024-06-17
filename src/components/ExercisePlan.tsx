"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

import { GrPlan } from "react-icons/gr";
import { CiCircleRemove } from "react-icons/ci";
import { useExercisePlan } from "@/store/ExercisePlanStore";

export default function ExercisePlan() {
  const { exercises, removeExercise, emptyExercises } = useExercisePlan();
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
          <DrawerTitle>Exercises</DrawerTitle>
          <DrawerDescription>
            {exercises.map((exercise) => (
              <div
                className="my-4 flex w-full justify-between items-center px-4"
                key={exercise._id}
              >
                <div className="flex gap-2">
                  <span className="font-bold">{exercise.name}</span>/
                  <span>{exercise.force}</span>/
                  <span>{exercise.primaryMuscles[0]} </span>{" "}
                </div>
                <button
                  className="text-xl text-primary"
                  onClick={() => removeExercise(exercise._id!)}
                >
                  <CiCircleRemove />
                </button>
              </div>
            ))}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex justify-around items-center flex-row">
          <Button>Save</Button>
          <DrawerClose>
            <Button onClick={() => emptyExercises()} variant="outline">
              Empty
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

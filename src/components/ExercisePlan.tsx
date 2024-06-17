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
import { useExercisePlan } from "@/app/store/ExercisePlanStore";
import { GrPlan } from "react-icons/gr";
import { CiCircleRemove } from "react-icons/ci";

export default function ExercisePlan() {
  const { exercises, removeExercise, emptyExercises } = useExercisePlan();
  return (
    <Drawer>
      <DrawerTrigger>
        {" "}
        <div className="relative">
          <GrPlan />
          {exercises.length > 0 && (
            <p className="absolute bg-accent text-sm top-4 -right-2 w-5 h-5 rounded-full text-primary">
              {exercises.length}
            </p>
          )}
        </div>
      </DrawerTrigger>
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

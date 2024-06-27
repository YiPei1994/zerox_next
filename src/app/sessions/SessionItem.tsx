"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ExerciseData } from "@/types/types";

type SessionItemProps = {
  sessionExercise: ExerciseData;
  id: string;
};

export default function SessionItem({ sessionExercise, id }: SessionItemProps) {
  const { exerciseId } = sessionExercise;

  return (
    <div className="flex flex-col gap-2.5 my-4">
      <h4 className="text-2xl font-bold">{exerciseId.name}</h4>
      <div className="flex w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="reps">Repeats</Label>
        <Input type="text" id="reps" />
      </div>
      <div className="flex w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="weight">Weights</Label>
        <Input type="text" id="weight" />
      </div>
      <div className="flex w-full max-w-sm justify-between items-center gap-1.5">
        <div className="flex gap-3 items-center">
          <Label htmlFor="sets">Unit</Label>
          <Input type="text" id="sets" />
        </div>
        <Button>Update</Button>
      </div>
    </div>
  );
}

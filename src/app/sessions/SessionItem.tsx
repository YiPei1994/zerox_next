"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExerciseData } from "@/types/types";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

type SessionItemProps = {
  sessionExercise: ExerciseData;
  id: string;
};

export default function SessionItem({ sessionExercise, id }: SessionItemProps) {
  const { exerciseId } = sessionExercise;

  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      sets: "1",
      unit: "",
      exercises: [{ reps: "", weight: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const watchSets = watch("sets");
  const setsCount = parseInt(watchSets) || 0;

  useEffect(() => {
    const difference = setsCount - fields.length;
    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        append({ reps: "", weight: "" });
      }
    } else if (difference < 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        remove(fields.length - 1 - i);
      }
    }
  }, [setsCount, fields.length, append, remove]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("exerciseId", exerciseId._id);
    formData.append("sets", data.sets);
    formData.append("unit", data.unit);
    formData.append("exercises", JSON.stringify(data.exercises));

    // Send formData to server
    // Example: await fetch('/api/update-session', { method: 'POST', body: formData });
    console.log(Object.fromEntries(formData));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 my-4 px-2"
    >
      <div className="flex justify-between items-center w-full flex-wrap">
        <h4 className="text-2xl font-bold w-full my-4">{exerciseId.name}</h4>
        <div className="w-full flex justify-between items-center gap-4">
          <div className="flex w-full items-center gap-1.5">
            <Label htmlFor="sets">Sets:</Label>
            <Input type="number" id="sets" {...register("sets")} min="1" />
          </div>
          <div className="flex w-full justify-between items-center gap-1.5">
            <Label htmlFor="unit">Unit:</Label>
            <Input
              type="text"
              id="unit"
              {...register("unit")}
              placeholder="weight unit"
            />
          </div>
        </div>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="w-full flex justify-between items-center gap-4"
        >
          <div className="flex items-center gap-1.5">
            <Input
              type="text"
              {...register(`exercises.${index}.reps`)}
              placeholder="repeats"
            />
          </div>
          x
          <div className="flex items-center gap-1.5">
            <Input
              type="text"
              {...register(`exercises.${index}.weight`)}
              placeholder="weight"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center">
        <Button type="button" variant="destructive">
          Delete
        </Button>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}

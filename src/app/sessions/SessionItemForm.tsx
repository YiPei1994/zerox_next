"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSessionExercise } from "@/lib/actions/session";
import { ExerciseData } from "@/types/types";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { CiSquarePlus } from "react-icons/ci";

type SessionItemProps = {
  exerciseData: ExerciseData;
  id: string;
};

export default function SessionItemForm({
  exerciseData,
  id,
}: SessionItemProps) {
  const { unit, sets, setsData } = exerciseData;

  const { register, control, handleSubmit, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        sets: sets || 1,
        unit: unit || "",
        exercises:
          setsData.length > 0
            ? setsData.map((data) => ({ reps: data.reps, weight: data.weight }))
            : [{ reps: "", weight: "" }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const watchSets = watch("sets");
  const setsCount = watchSets || 0;
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

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("exerciseId", exerciseData.exerciseId._id);
    formData.append("sets", data.sets);
    formData.append("unit", data.unit);
    formData.append("setsData", JSON.stringify(data.exercises));

    await updateSessionExercise(formData);
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setValue("sets", getValues("sets") + 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 my-4 px-2"
    >
      <div className="flex justify-between items-center w-full flex-wrap">
        <div className="w-full flex justify-between items-center gap-4">
          <div className="flex w-full items-center gap-1.5">
            <Label htmlFor="sets">Sets:</Label>
            {sets ? (
              <Button
                className="text-4xl text-primary"
                variant="ghost"
                onClick={handleAdd}
              >
                <CiSquarePlus />
              </Button>
            ) : (
              <Input
                type="number"
                id="sets"
                {...register("sets", { required: true })}
                min="1"
                placeholder="sets"
              />
            )}
          </div>
          <div className="flex w-full justify-between items-center gap-1.5">
            <Label htmlFor="unit">Unit:</Label>
            <Input
              type="text"
              id="unit"
              {...register("unit", { required: true })}
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
              {...register(`exercises.${index}.reps`, { required: true })}
              placeholder="repeats"
            />
          </div>
          x
          <div className="flex items-center gap-1.5">
            <Input
              type="text"
              {...register(`exercises.${index}.weight`, { required: true })}
              placeholder="weight"
            />
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center">
        <Button type="reset" variant="destructive">
          Delete
        </Button>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}

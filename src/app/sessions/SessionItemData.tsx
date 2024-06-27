import { ExerciseData } from "@/types/types";

type SessionItemDataProps = {
  exerciseData: ExerciseData;
};
export default function SessionItemData({
  exerciseData,
}: SessionItemDataProps) {
  const { setsData, unit } = exerciseData;

  return (
    <ul>
      {setsData.map((data, i) => (
        <li
          key={i}
          className="flex gap-4 w-full justify-between items-center pb-2 mx-auto text-center"
        >
          <span className="w-[20%]">Set {i + 1}</span>{" "}
          <span className="w-[10%]"> -</span>
          <span className="w-[30%]">{data.reps} repeats</span>
          <span className="w-[10%]"> X</span>{" "}
          <span className="w-[30%]">
            {data.weight} {unit}
          </span>{" "}
        </li>
      ))}
    </ul>
  );
}

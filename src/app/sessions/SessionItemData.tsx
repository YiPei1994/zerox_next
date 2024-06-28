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
          className="flex gap-4 w-full justify-between items-center pb-3 mx-auto text-center text-sm"
        >
          <span className="w-[20%]">Set {i + 1}</span>{" "}
          <span className="w-[5%]"> -</span>
          <span className="w-[35%]">{data.reps} reps</span>
          <span className="w-[5%]"> X</span>{" "}
          <span className="w-[35%]">
            {data.weight} {unit}
          </span>{" "}
        </li>
      ))}
    </ul>
  );
}

import { ExerciseClient } from "@/types/types";
import { FiCrosshair } from "react-icons/fi";

type ExerciseInfoProps = {
  exercise: ExerciseClient;
};
export default function ExerciseInfo({ exercise }: ExerciseInfoProps) {
  const {
    name,
    force,
    level,
    mechanic,
    equipment,
    primaryMuscles,
    secondaryMuscles,
  } = exercise;
  return (
    <div className="px-4 flex flex-col gap-2">
      <h4 className="font-bold text-3xl text-primary">{name}</h4>
      <div className="border-b pb-2 text-sm ">
        <span className="font-bold">Exercise: </span>{" "}
        <ul>
          <li>{force} </li>
          <li>{mechanic}</li>
          <li> {equipment}</li>
        </ul>
      </div>

      <p className="border-b pb-2 text-sm">
        <span className="font-bold">Difficulity:</span> {level}
      </p>
      <div>
        <h6 className="mb-2 flex items-center gap-2">
          <span>Target:</span> <FiCrosshair className="text-primary" />
        </h6>
        <ul className="list-disc">
          {primaryMuscles.map((muscle, i) => (
            <li className="ml-6 text-sm" key={i}>
              {muscle}
            </li>
          ))}
        </ul>
        <ul className="list-disc">
          {secondaryMuscles.map((muscle, i) => (
            <li className="ml-6 text-s" key={i}>
              {muscle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

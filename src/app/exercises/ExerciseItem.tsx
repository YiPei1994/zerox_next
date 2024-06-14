import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExerciseClient } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { GrHelpBook } from "react-icons/gr";

type ExerciseItemProps = {
  exercise: ExerciseClient;
};
export default function ExerciseItem({ exercise }: ExerciseItemProps) {
  const { _id, name, force, level, primaryMuscles, equipment, mechanic } =
    exercise;
  return (
    <div className="group px-4 py-4 flex flex-col gap-4">
      <div className="w-full overflow-hidden h-48 relative aspect-square ">
        <Image
          fill
          src={`/exercises/${name
            .replaceAll(" ", "_")
            .replaceAll("/", "_")}/images/0.jpg`}
          alt={name}
          className="object-cover skew-y-6"
        />
      </div>
      <div className=" relative">
        <h4 className="absolute bg-primary text-accent text-2xl font-bolder px-4 py-2 -top-[50px] translate-x-[-50%] left-[50%] uppercase w-max skew-x-6">
          {name}
        </h4>
        <div className="my-4 flex flex-col gap-2">
          <div className="flex gap-4">
            <span>Type: </span>
            <Badge>{force}</Badge>
            <Badge>{level}</Badge>
          </div>
          <div className="flex gap-4">
            <span>How: </span>
            <Badge>{equipment}</Badge>
            <Badge>{mechanic}</Badge>
          </div>
          <div className="flex gap-4">
            <span>Muscles: </span>
            <Badge>{primaryMuscles}</Badge>
          </div>
        </div>
      </div>
      <Button className="w-min">
        <Link className="flex gap-4 items-center" href={`/exercises/${_id}`}>
          <GrHelpBook />
          <span>More Detail</span>{" "}
        </Link>
      </Button>
    </div>
  );
}

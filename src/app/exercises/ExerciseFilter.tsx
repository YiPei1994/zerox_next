"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ExerciseFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const activeFilter = searchParams.get("category") ?? "all";

  function handleChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const value = (e.target as HTMLInputElement).value;
    const params = new URLSearchParams(searchParams);

    params.set("category", value);
    router.replace(`${path}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-4 flex-wrap py-4 justify-center items-center">
      <Button
        variant={activeFilter === "all" ? "default" : "secondary"}
        onClick={handleChange}
        value="all"
      >
        All
      </Button>
      <Button
        variant={activeFilter === "chest" ? "default" : "secondary"}
        onClick={handleChange}
        value="chest"
      >
        Chest
      </Button>
      <Button
        variant={activeFilter === "shoulders" ? "default" : "secondary"}
        onClick={handleChange}
        value="shoulders"
      >
        Shoulder
      </Button>
      <Button
        variant={activeFilter === "biceps" ? "default" : "secondary"}
        onClick={handleChange}
        value="biceps"
      >
        Biceps
      </Button>
      <Button
        variant={activeFilter === "triceps" ? "default" : "secondary"}
        onClick={handleChange}
        value="triceps"
      >
        Triceps
      </Button>
      <Button
        variant={activeFilter === "abs" ? "default" : "secondary"}
        onClick={handleChange}
        value="abs"
      >
        Abs
      </Button>
      <Button
        variant={activeFilter === "quadriceps" ? "default" : "secondary"}
        onClick={handleChange}
        value="quadriceps"
      >
        Quads
      </Button>
    </div>
  );
}

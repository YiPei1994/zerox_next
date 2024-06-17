import ExercisePlan from "@/components/ExercisePlan";
import { PropsWithChildren } from "react";

export default function Exerciselayout({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      <div className="fixed top-[250px] right-0 py-3 px-4 bg-primary text-accent rounded-l-md text-2xl z-50 border border-s-accent">
        {" "}
        <ExercisePlan />
      </div>
      {children}
    </div>
  );
}

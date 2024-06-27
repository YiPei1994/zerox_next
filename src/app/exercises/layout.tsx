import { PropsWithChildren } from "react";
import ExercisePlan from "./ExercisePlan";

export default function Exerciselayout({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      <div className="fixed top-[250px] right-0  z-50 ">
        {" "}
        <ExercisePlan />
      </div>
      {children}
    </div>
  );
}

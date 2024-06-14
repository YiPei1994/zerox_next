"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiWeightLiftingUp } from "react-icons/gi";
import { PiUsersThree } from "react-icons/pi";
import { PiRankingFill } from "react-icons/pi";

export default function Navbar() {
  const path = usePathname();
  return (
    <ul className="flex gap-10 py-6 ">
      <li
        className={`text-muted-foreground hover:text-primary flex  justify-center items-center ${
          path.startsWith("/exercises") ? "text-primary" : ""
        }`}
      >
        <Link href="/exercises" className="flex gap-4">
          <GiWeightLiftingUp className="text-2xl" />
          <span className="max-md:hidden">Exercises</span>{" "}
        </Link>
      </li>
      <li
        className={`text-muted-foreground hover:text-primary flex  justify-center items-center ${
          path.startsWith("/community") ? "text-primary" : ""
        }`}
      >
        <Link href="/community" className="flex gap-4">
          <PiUsersThree className="text-2xl" />
          <span className="max-md:hidden">Community</span>{" "}
        </Link>
      </li>
      <li
        className={`text-muted-foreground hover:text-primary flex  justify-center items-center ${
          path.startsWith("/community") ? "text-primary" : ""
        }`}
      >
        <Link href="/leaderboard" className="flex gap-4">
          <PiRankingFill className="text-2xl" />
          <span className="max-md:hidden">Leader Board</span>{" "}
        </Link>
      </li>
    </ul>
  );
}

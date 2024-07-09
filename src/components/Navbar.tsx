"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";

import { VscGraph } from "react-icons/vsc";

export default function Navbar({ session }: { session: string | undefined }) {
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
        className={`${
          !session ? "hidden" : ""
        } text-muted-foreground hover:text-primary flex  justify-center items-center ${
          path.startsWith("/sessions") ? "text-primary" : ""
        }`}
      >
        <Link href="/sessions" className="flex gap-4">
          <VscGraph className="text-2xl" />
          <span className="max-md:hidden">Sessions</span>{" "}
        </Link>
      </li>

      <li
        className={`text-muted-foreground hover:text-primary flex  justify-center items-center ${
          path.startsWith("/account") ? "text-primary" : ""
        }`}
      >
        <Link href="/account" className="flex gap-4">
          <FaUser className="text-2xl" />
          <span className="max-md:hidden">Account</span>{" "}
        </Link>
      </li>
    </ul>
  );
}

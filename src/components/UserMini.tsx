"use client";

import GoogleSignOut from "@/app/login/GoogleSignOut";
import { UserClient } from "@/types/types";
import { Session } from "next-auth";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
type UserMiniProps = {
  session: Session;
  user: UserClient;
};
export default function UserMini({ session, user }: UserMiniProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`${
        show ? "right-0" : ""
      } flex gap-4 items-center ml-auto   bg-accent transition-all ease-in-out duration-300 rounded-l-md `}
      onClick={() => setShow((s) => !s)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar>
          <AvatarImage src={user ? user?.icon : session?.user?.image} />
          <AvatarFallback>IC</AvatarFallback>
        </Avatar>
        {user && <Badge>{user.admin}</Badge>}
      </div>

      <GoogleSignOut />
    </div>
  );
}

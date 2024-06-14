"use client";

import { IUser } from "@/models/user";

import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import GoogleSignOut from "@/app/login/GoogleSignOut";
import { useState } from "react";
import { UserClient } from "@/types/types";

type UserMiniProps = {
  session: Session;
  user: UserClient;
};
export default function UserMini({ session, user }: UserMiniProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`${
        show ? "-right-0" : ""
      } flex gap-4 items-center ml-auto py-2 px-4  fixed top-[12%] -right-[240px] bg-accent transition-all ease-in-out duration-300 `}
      onClick={() => setShow((s) => !s)}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Avatar>
        <AvatarImage src={user ? user?.icon : session?.user?.image} />
        <AvatarFallback>IC</AvatarFallback>
      </Avatar>

      <div>
        <p>
          Welcome, <span>{user ? user.name : session?.user?.email} </span>
        </p>
        {user && <Badge>{user.admin}</Badge>}
      </div>

      <GoogleSignOut />
    </div>
  );
}

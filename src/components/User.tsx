import { auth } from "@/lib/auth";

import { findUserByEmail, findUserById } from "@/lib/data-servise";
import Link from "next/link";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import UserMini from "./UserMini";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/helpers";

export default async function User() {
  const session = await auth();

  const cookie = cookies().get("session")?.value;

  if (!session && !cookie)
    return (
      <div className="flex gap-4 items-center ml-auto py-2 ">
        <Link href="/login" className="text-primary p-4 text-2xl rounded-md">
          <HiArrowRightEndOnRectangle />
        </Link>
      </div>
    );
  if (session) {
    const user = await findUserByEmail(session?.user?.email);
    return <UserMini session={session} user={user} />;
  }

  if (cookie) {
    const resolve = verifyToken(cookie);
    const user = await findUserById(resolve.id);
    return <UserMini user={user} />;
  }
}

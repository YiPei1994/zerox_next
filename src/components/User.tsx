import { auth } from "@/lib/auth";

import { findUserByEmail } from "@/lib/data-servise";
import Link from "next/link";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import UserMini from "./UserMini";

export default async function User() {
  const session = await auth();
  const user = await findUserByEmail(session?.user?.email);

  if (!session)
    return (
      <div className="flex gap-4 items-center ml-auto py-2  fixed top-[12%] right-0">
        <Link href="/login" className="bg-primary text-white p-4 text-2xl">
          <HiArrowRightEndOnRectangle />
        </Link>
      </div>
    );

  return <UserMini session={session} user={user} />;
}

import { verifyUserFromCookie } from "@/lib/actions/user";
import Link from "next/link";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import UserMini from "./UserMini";

export default async function User() {
  const user = await verifyUserFromCookie();

  if (!user)
    return (
      <div className="flex gap-4 items-center ml-auto py-2 ">
        <Link href="/login" className="text-primary p-4 text-2xl rounded-md">
          <HiArrowRightEndOnRectangle />
        </Link>
      </div>
    );

  return <UserMini />;
}

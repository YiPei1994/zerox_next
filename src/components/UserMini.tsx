import GoogleSignOut from "@/app/login/GoogleSignOut";
import UserSignOut from "@/app/login/UserSignOut";
import { verifyUserFromCookie } from "@/lib/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function UserMini() {
  const user = await verifyUserFromCookie();
  return (
    <div
      className={` flex gap-4 items-center ml-auto   bg-accent transition-all ease-in-out duration-300 rounded-l-md `}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.icon} />
          <AvatarFallback>IC</AvatarFallback>
        </Avatar>
      </div>
      <UserSignOut />
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";

import GoogleSignOut from "@/app/login/GoogleSignOut";
import { findUserByEmail } from "@/lib/data-servise";
import { Badge } from "./ui/badge";

export default async function User() {
  const session = await auth();
  const user = await findUserByEmail(session?.user?.email);

  if (!session) return;
  return (
    <div className="flex gap-4 items-center ml-auto py-2 px-4">
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

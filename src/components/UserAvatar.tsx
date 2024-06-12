import { auth } from "@/lib/auth";
import Image from "next/image";

export default async function UserAvatar() {
  const session = await auth();
  if (!session) return;
  return (
    <div className="avatar">
      <div className="w-8 rounded">
        <img
          src={session?.user?.image}
          alt={session?.user?.name}
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}

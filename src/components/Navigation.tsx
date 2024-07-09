import { cookies } from "next/headers";
import Navbar from "./Navbar";
import User from "./User";

export default function Navigation() {
  const session = cookies().get("session")?.value;

  return (
    <div className="w-full flex border-b fixed top-0 left-0 min-w-full bg-secondary z-40 min-h-[80px]">
      <div className="max-w-screen-2xl mx-auto flex gap-4 w-[90%]">
        <Navbar session={session} />
        <User />
      </div>
    </div>
  );
}

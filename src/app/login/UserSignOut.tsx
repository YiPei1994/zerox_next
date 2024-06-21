import { userSignOut } from "@/lib/actions/auth";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

function UserSignOut() {
  return (
    <form action={userSignOut}>
      <button className="py-2 px-2  hover:text-primary/50 transition-colors flex items-center gap-4 font-semibold text-primary w-full">
        <HiArrowRightStartOnRectangle />
      </button>
    </form>
  );
}

export default UserSignOut;

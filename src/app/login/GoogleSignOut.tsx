import { signOutAction } from "@/lib/actions";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

function GoogleSignOut() {
  return (
    <form action={signOutAction}>
      <button className="py-3 px-5 hover:bg-primary/80 hover:text-primary/50 transition-colors flex items-center gap-4 font-semibold text-primary w-full">
        <HiArrowRightStartOnRectangle />
      </button>
    </form>
  );
}

export default GoogleSignOut;

import { signOutAction } from "@/lib/actions";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

function GoogleSignOut() {
  return (
    <form action={signOutAction}>
      <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
        <HiArrowRightStartOnRectangle />
      </button>
    </form>
  );
}

export default GoogleSignOut;

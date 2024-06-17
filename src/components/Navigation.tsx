import Navbar from "./Navbar";
import User from "./User";

export default function Navigation() {
  return (
    <div className="w-full flex border-b fixed top-0 left-0 min-w-full bg-secondary z-40 min-h-[80px]">
      <div className="max-w-screen-2xl mx-auto">
        <Navbar />
        <User />
      </div>
    </div>
  );
}

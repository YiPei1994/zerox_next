import { cookies } from "next/headers";

export default function page() {
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4 p-4">
      <header className="col-span-full row-span-1 bg-red">
        <h4 className="text-bold text-2xl">Account settings</h4>
        <span className="text-foreground text-sm">
          Manage your account settings and set preferences.
        </span>
      </header>
      <aside className="col-span-1 row-span-4 bg-green">sideNav</aside>
      <div className="col-span-4 row-span-4 bg-green">body</div>
    </div>
  );
}

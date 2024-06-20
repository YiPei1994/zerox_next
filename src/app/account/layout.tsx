import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function accountLayout({ children }: PropsWithChildren) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) redirect("/");
  return <div>{children}</div>;
}

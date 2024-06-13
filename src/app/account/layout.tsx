import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { PropsWithChildren } from "react";

export default async function accountLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (!session) redirect("/");
  return <div>{children}</div>;
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cookies } from "next/headers";

export default function page() {
  const token = cookies().get("session")?.value;

  return (
    <div>
      <header className="col-span-full row-span-1">
        <h4 className="text-bold text-2xl">Account settings</h4>
        <span className="text-foreground text-sm">
          Manage your account settings and set preferences.
        </span>
      </header>
      <Tabs>
        <TabsList>
          <TabsTrigger value="profile">Profile settings</TabsTrigger>
          <TabsTrigger value="password">Password settings</TabsTrigger>
        </TabsList>
        <TabsContent value="profile"></TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
    </div>
  );
}

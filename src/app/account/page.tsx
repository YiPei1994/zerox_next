import fs from "fs";
import path from "path";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cookies } from "next/headers";
import UserProfileForm from "./UserProfileForm";
import { verifyToken } from "@/lib/helpers";

import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
import UserPasswordForm from "./UserPasswordForm";
import User from "@/models/user";
import { verifyUserFromCookie } from "@/lib/actions/user";

export default async function page() {
  // read avatars
  const avatarsDirectory = path.join(process.cwd(), "public", "avatars");
  const avatarFiles = fs.readdirSync(avatarsDirectory);

  const user = await verifyUserFromCookie();
  if (!user) return;
  return (
    <div>
      <header className="mb-4">
        <h4 className="text-bold text-2xl">Account settings</h4>
        <span className="text-foreground text-sm">
          Manage your account settings and set preferences.
        </span>
      </header>

      <Tabs defaultValue="profile">
        <TabsList className="w-full ">
          <TabsTrigger className="w-1/2" value="profile">
            Profile settings
          </TabsTrigger>
          <TabsTrigger className="w-1/2" value="password">
            Password settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Suspense fallback={<Spinner />}>
            <UserProfileForm avatars={avatarFiles} user={user} />
          </Suspense>
        </TabsContent>
        <TabsContent value="password">
          <UserPasswordForm oldPasswordHash={user.password} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

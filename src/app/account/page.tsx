import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import fs from "fs";
import path from "path";

import UserProfileForm from "./UserProfileForm";

import { verifyUserFromCookie } from "@/lib/actions/user";
import UserPasswordForm from "./UserPasswordForm";

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
          <UserProfileForm avatars={avatarFiles} user={user} />
        </TabsContent>
        <TabsContent value="password">
          <UserPasswordForm oldPasswordHash={user.password} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import NextAuth, { Session, User } from "next-auth";
import Google from "next-auth/providers/google";

import { createUserGoogleAuth, getUserGoogleAuth } from "./data-servise";
import { cookies } from "next/headers";
import { createToken } from "./helpers";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: { auth: Session | null; request: Request }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }) {
      try {
        const existingUser = await getUserGoogleAuth(user.email);
        const token = createToken(String(existingUser?._id));
        cookies().set("session", token);
        if (!existingUser) {
          const newUser = await createUserGoogleAuth({
            email: user.email,
            name: user.name,
            icon: user.image,
          });
          const token = createToken(String(newUser?._id));
          cookies().set("session", token);
        }

        return true;
      } catch {
        return false;
      }
    },
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);

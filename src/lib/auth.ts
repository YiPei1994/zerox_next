import NextAuth, { Session, User } from "next-auth";
import Google from "next-auth/providers/google";

import { createUserGoogleAuth, getUserGoogleAuth } from "./data-servise";

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

        if (!existingUser)
          await createUserGoogleAuth({
            email: user.email,
            name: user.name,
            icon: user.image,
            createFrom: "OAUTH",
          });

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

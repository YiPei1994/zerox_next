import NextAuth, { Session, User as userType } from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { createToken } from "./helpers";
import User from "@/models/user";

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
    async signIn({ user }: { user: userType }) {
      try {
        const existingUser = await User.findOne({ email: user.email });
        const token = createToken(String(existingUser?._id));
        cookies().set("session", token, { httpOnly: true });
        if (!existingUser) {
          const newUser = await User.create({
            email: user.email,
            name: user.name,
            icon: user.image,
          });
          const token = createToken(String(newUser?._id));
          cookies().set("session", token, { httpOnly: true });
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

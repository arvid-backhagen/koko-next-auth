import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";

export const nextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHub({
      profile(profile) {
        console.log("Github Profile:", profile);
        // Enriching the returned value of what GitHub returns when we authenticate
        // Ideally you would check your database for registered users here to apply the role they have there
        const role =
          profile.email === "arvid.backhagen@gmail.com" ? "admin" : "user";
        return {
          ...profile,
          role: role,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Enriching the session object
      session.user.role = token.role as string;
      session.user.image = token.avatar_url as string;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (typeof user !== "undefined") {
        // user has just signed in so the user object is populated
        console.log(
          "User just signed in, so populating token with user data: ",
          user
        );
        return { ...user } as JWT;
      }
      return token;
    },
  },
} satisfies NextAuthOptions;

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NEXTAUTH_SECRET: string;

      GITHUB_ID: string;
      GITHUB_SECRET: string;
    }
  }
}

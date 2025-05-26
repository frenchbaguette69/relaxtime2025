import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/server/db";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
/**
 * Module augmentation for `next-auth` types.
 * Hiermee voeg je custom properties (zoals `id` en `role`) toe aan `session.user`
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
  user: {
    id: string;
  } & DefaultSession["user"];
}

}

/**
 * Configuratie voor NextAuth.js
 */
export const authConfig = {
  theme: {
    colorScheme: "light",
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // ✅ redirect naar je eigen loginpagina
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ✅ Zorg dat credentials niet leeg zijn
        if (!credentials?.email || !credentials?.password) {
          console.warn("Email of wachtwoord ontbreekt.");
          return null;
        }

        // ✅ Haal gebruiker op via Prisma
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        // ✅ Controleer wachtwoord
        if (user?.hashedPassword) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.hashedPassword
          );

          if (isPasswordValid) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  trustHost: true,
  callbacks: {
    // ✅ JWT token verrijken met user info
    async jwt({ token, user }) {
  if (user) {
    token.sub = user.id; // ✅ zodat token.sub beschikbaar is
    token.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  return token;
}
,

    // ✅ Session aanvullen met user info
   async session({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) {
  if (session.user && token?.sub) {
    session.user.id = token.sub;
  }

  return session;
},
  },
} satisfies NextAuthConfig;

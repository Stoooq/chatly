import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import { getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: "/sign-in",
	},
	callbacks: {
		async session({ token, session }) {
			if (!token.sub || !session.user) return session;

			session.user.id = token.sub;
			session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
			session.user.name = token.name;
			session.user.email = token.email!;
			session.user.isOAuth = token.isOAuth as boolean;

			console.log("TOKEN ", token, "SESSION ", session);

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await getUserById(token.sub);

			if (!existingUser) return token;

			const existingAccount = await getAccountByUserId(existingUser.id);

			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

			return token;
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: "jwt" },
	...authConfig,
});

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";

import { db } from "@/db";
import { env } from "@/env";

export const auth = betterAuth({
	baseURL: env.NEXT_PUBLIC_APP_URL,
	database: prismaAdapter(db, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
	},
	plugins: [username(), nextCookies()],
	secret: env.BETTER_AUTH_SECRET,
});

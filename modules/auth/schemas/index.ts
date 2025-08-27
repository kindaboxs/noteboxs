import { z } from "zod";

export const signUpSchema = z.object({
	name: z
		.string()
		.min(3, "Name must be at least 3 characters long")
		.max(64, "Name must be at most 64 characters long"),
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.max(128, "Password must be at most 128 characters long"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.max(128, "Password must be at most 128 characters long"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	try {
		const validation = LoginSchema.safeParse(values);
		if (!validation.success) return { error: "Invalid fields" };

		const { email, password } = validation.data;

		const existingUser = await getUserByEmail(email);

		if (!existingUser || !existingUser.email || !existingUser.password) {
			return { error: "Email does not exist" };
		}

		if (!existingUser.emailVerified) {
			const verificationToken = await generateVerificationToken(
				existingUser.email
			);

			await sendVerificationEmail(
				verificationToken.email,
				verificationToken.token
			);

			return { success: "Confirmation email sent" };
		}

		await signIn("credentials", {
			email,
			password,
			redirectTo: "/",
		});

		return { success: "User logged" };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Email or Password Incorrect" };
				case "AccessDenied":
					return { error: error.message };
				case "OAuthSignInError":
					return { error: error.message };
				default:
					return { error: "Something went wrong" };
			}
		}
		throw error;
	}
};

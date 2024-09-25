"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validation = RegisterSchema.safeParse(values);

	if (!validation.success) {
		return { error: "Invalid fields" };
	}

	const { email, password, name } = validation.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		if (!existingUser.emailVerified) {
			const verificationToken = await generateVerificationToken(email);
			await sendVerificationEmail(
				verificationToken.email,
				verificationToken.token
			);

			return { success: "Email confirmation resent" };
		}
		return { error: "Something went wrong" };
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(verificationToken.email, verificationToken.token);

	return { success: "Confirmation email sent" };
};

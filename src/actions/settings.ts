"use server";

import z from "zod";
import db from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const session = await auth();
	const user = session?.user;

	if (!user) return { error: "Unauthorized" };

	const dbUser = await getUserById(user.id!); //!

	if (!dbUser) return { error: "Unauthorized" };

	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}

	if (values.email && values.email !== user.email) {
		const existingUser = await getUserByEmail(values.email);

		if (existingUser && existingUser.id !== user.id)
			return { error: "Email already in use" };

		const verificationToken = await generateVerificationToken(values.email);

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);

		return { success: "Verification email sent" };
	}

	if (values.password && values.newPassword && dbUser.password) {
		const passwordMatch = await bcrypt.compare(values.password, dbUser.password)
		if (!passwordMatch) {
		  return { error: "Password does not match" }
		}
		const samePassword = await bcrypt.compare(
		  values.newPassword,
		  dbUser.password
		)
		if (samePassword) {
		  return { error: "New password is the same as the old password" }
		}
		const hashedPassword = await bcrypt.hash(values.newPassword, 10)
		values.password = hashedPassword
		values.newPassword = undefined
	  }

	await db.user.update({
		where: { id: dbUser.id },
		data: { ...values },
	});

    revalidatePath('/settings')

	return { success: "Settings updated" };
};

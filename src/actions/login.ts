"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validation = LoginSchema.safeParse(values);
	if (!validation.success) return { error: "Invalid fields" };

	const { email, password } = validation.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: "Email does not exist" };
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: "/",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CallbackRouteError":
					return { error: "Invalid credentials" };
				default:
					console.log(error.type);
					return { error: "Something went wrong" };
			}
		}

		throw error;
	}
	revalidatePath("/");

	return { success: "User logged" };
};

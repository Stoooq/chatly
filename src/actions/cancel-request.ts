"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const cancelRequest = async (id: string) => {
	const session = await auth();

	if (!session) return { error: "Not authorized" };

	const existingRequest = await db.friendRequest.findUnique({
		where: {
			id,
		},
	});

	if (!existingRequest) {
		return { error: "Something went wrong" };
	}

	await db.friendRequest.delete({
		where: {
			id: existingRequest.id,
		},
	});

	revalidatePath('/home')

	return { success: "Request canceled" };
};

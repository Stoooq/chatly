"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const acceptRequest = async (id: string) => {
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

	await db.friend.create({
		data: {
			userId: existingRequest.senderId,
			friendId: existingRequest.receiverId,
		},
	});

	await db.friend.create({
		data: {
			userId: existingRequest.receiverId,
			friendId: existingRequest.senderId,
		},
	});

	await db.friendRequest.delete({
		where: {
			id: existingRequest.id,
		},
	});

	revalidatePath("/home");

	return { success: "Request accepted" };
};

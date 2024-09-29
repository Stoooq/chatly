"use server";

import db from "@/lib/db";

export const sentRequests = async (senderId: string) => {
	const user = await db.user.findUnique({
		where: { id: senderId },
	});
	return user;
};

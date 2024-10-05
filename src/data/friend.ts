import { getUser } from "@/actions/get-user";
import db from "@/lib/db";

export const getAllFriends = async (userId: string) => {
	try {
		const friends = await db.friend.findMany({
			where: { userId },
			include: {
				friend: true,
			},
		});
		return friends;
	} catch {
		return null;
	}
};

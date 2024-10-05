import db from "@/lib/db";

export const getSentFriendRequests = async (id: string) => {
	try {
		const requests = await db.friendRequest.findMany({
			where: { senderId: id },
			include: {
				receiver: true,
			},
		});
		return requests;
	} catch {
		return null;
	}
};

export const getReceivedFriendRequests = async (id: string) => {
	try {
		const requests = await db.friendRequest.findMany({
			where: {
				receiverId: id,
			},
			include: {
				sender: true,
			},
		});
		return requests;
	} catch {
		return null;
	}
};

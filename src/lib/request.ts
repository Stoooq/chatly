import db from "@/lib/db";

export const sendRequest = async (senderId: string, receiverId: string) => {
	const existingRequest = await db.friendRequest.findFirst({
		where: {
			senderId,
			receiverId,
			status: "PENDING",
		},
	});

	if (existingRequest) {
		await db.friendRequest.delete({
			where: {
				id: existingRequest.id,
			},
		});
	}

	const friendRequest = await db.friendRequest.create({
		data: {
			senderId,
			receiverId,
			status: "PENDING",
		},
	});

	return friendRequest;
};

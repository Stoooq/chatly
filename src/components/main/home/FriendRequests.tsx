import { ExtendedUser } from "../../../../next-auth";
import React from "react";
import RequestsSent from "./RequestsSent";
import {
	getReceivedFriendRequests,
	getSentFriendRequests,
} from "@/data/friend-request";
import RequestsReceived from "../home/RequestsReceived";

const FriendRequests = async ({ user }: { user: ExtendedUser }) => {
	const sentRequests = await getSentFriendRequests(user.id!);
	const receivedRequests = await getReceivedFriendRequests(user.id!);

	if (!sentRequests || !receivedRequests) return "";

	return (
		<div className="grid grid-cols-2 gap-6 h-[250px]">
			<div className="col-span-1 flex flex-col">
				<div className="flex justify-center items-center text-xl font-semibold">
					Sent
				</div>
				<RequestsSent requests={sentRequests} />
			</div>
			<div className="col-span-1 flex flex-col">
				<div className="flex justify-center items-center text-xl font-semibold">
					Received
				</div>
				<RequestsReceived requests={receivedRequests} />
			</div>
		</div>
	);
};

export default FriendRequests;

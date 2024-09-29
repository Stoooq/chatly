import { ExtendedUser } from "../../../next-auth";
import React from "react";
import RequestsSent from "./RequestsSent";
import {
	getReceivedFriendRequests,
	getSentFriendRequests,
} from "@/data/friend-request";
import RequestsReceived from "./RequestsReceived";

const FriendRequests = async ({ user }: { user: ExtendedUser }) => {
	const sentRequests = await getSentFriendRequests(user.id!);
	const receivedRequests = await getReceivedFriendRequests(user.id!);

	if (!sentRequests || !receivedRequests) return "";

	return (
		<div className="grid grid-cols-2">
			<div className="col-span-1">
				<RequestsSent requests={sentRequests} />
			</div>
			<div className="col-span-1">
				<RequestsReceived requests={receivedRequests} />
			</div>
		</div>
	);
};

export default FriendRequests;

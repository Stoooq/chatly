"use client";

import { FriendRequest } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { sentRequests } from "@/actions/sent-requests";
import { cancelRequest } from "@/actions/cancel-request";

const RequestSent = ({ request }: { request: FriendRequest }) => {
	const {
		data: user,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["requestsSent", request.id],
		queryFn: async () => {
			return await sentRequests(request.receiverId);
		},
	});

	const cancel = (id: string) => {
		cancelRequest(id);
	};

	if (isLoading) return "Loading";

	return (
		<div>
			{user?.name}
			<Button variant="secondary" onClick={() => cancel(request.id)}>
				Cancel
			</Button>
		</div>
	);
};

const RequestsSent = ({ requests }: { requests: FriendRequest[] }) => {
	return (
		<>
			<h2 className="text-xl">Sent</h2>
			{requests?.map((request) => (
				<RequestSent key={request.id} request={request} />
			))}
		</>
	);
};

export default RequestsSent;

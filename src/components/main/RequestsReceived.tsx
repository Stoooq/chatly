"use client";

import { FriendRequest } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { sentRequests } from "@/actions/sent-requests";
import { cancelRequest } from "@/actions/cancel-request";

const RequestReceived = ({ request }: { request: FriendRequest }) => {
	const {
		data: user,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["requestsSent", request.id],
		queryFn: async () => {
			return await sentRequests(request.senderId);
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
			<Button variant="default" onClick={() => {}}>
				Accept
			</Button>
		</div>
	);
};

const RequestsReceived = ({ requests }: { requests: FriendRequest[] }) => {
	return (
		<>
			<h2 className="text-xl">Received</h2>
			{requests?.map((request) => (
				<RequestReceived key={request.id} request={request} />
			))}
		</>
	);
};

export default RequestsReceived;

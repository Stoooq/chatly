"use client";

import { FriendRequest, User } from "@prisma/client";
import React from "react";
import { Button } from "../../ui/button";
import { cancelRequest } from "@/actions/cancel-request";

const RequestsSent = ({
	requests,
}: {
	requests: (FriendRequest & { receiver: User })[];
}) => {
	const cancel = (id: string) => {
		cancelRequest(id);
	};

	return (
		<>
			{requests.length > 0 ? (
				<div className="flex flex-col items-center">
					{requests?.map((request) => (
						<div className="flex items-center gap-6 mt-6 max-w-full">
							<Button variant="secondary" onClick={() => cancel(request.id)}>
								Cancel
							</Button>
							<h2 className="text-lg truncate">{request.receiver.name}</h2>
						</div>
					))}
				</div>
			) : (
				<div className="m-auto h-full flex items-center justify-center">
					<p className="text-muted-foreground">
						You don&apos;t have any requests
					</p>
				</div>
			)}
		</>
	);
};

export default RequestsSent;

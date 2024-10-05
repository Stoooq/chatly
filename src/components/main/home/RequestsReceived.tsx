"use client";

import { FriendRequest, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cancelRequest } from "@/actions/cancel-request";
import { acceptRequest } from "@/actions/accept-request";

const RequestsReceived = ({
	requests,
}: {
	requests: (FriendRequest & { sender: User })[];
}) => {
	const cancel = (id: string) => {
		cancelRequest(id);
	};

	const accept = (id: string) => {
		acceptRequest(id);
	};

	return (
		<>
			{requests.length > 0 ? (
				<div className="flex flex-col items-center">
					{requests?.map((request) => (
						<div className="flex items-center gap-6 mt-6 max-w-full">
							<div className="space-x-2">
								<Button variant="secondary" onClick={() => cancel(request.id)}>
									Cancel
								</Button>
								<Button variant="default" onClick={() => accept(request.id)}>
									Accept
								</Button>
							</div>
							<h2 className="text-lg truncate">{request.sender.name}</h2>
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

export default RequestsReceived;

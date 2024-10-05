"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Friend, User } from "@prisma/client";
import React from "react";

const FriendsList = ({ friends }: { friends: (Friend & { friend: User })[] }) => {
	return (
		<div className="flex fle-col gap-4 mt-6">
			{friends.map((friend) => (
				<div key={friend.id} className="flex items-center gap-6">
				<Avatar>
					<AvatarImage src={friend.friend.image!} />
					<AvatarFallback>?</AvatarFallback>
				</Avatar>
				<h2 className="text-lg font-semibold">{friend.friend.name}</h2>
			</div>
			))}
		</div>
	);
};

export default FriendsList;

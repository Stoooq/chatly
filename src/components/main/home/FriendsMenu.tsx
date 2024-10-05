import React from "react";
import { getAllUsers } from "@/data/user";
import { getAllFriends } from "@/data/friend";
import { ExtendedUser } from "../../../../next-auth";
import SearchFriends from "./SearchFriends";
import FriendsList from "./FriendsList";

const FriendsMenu = async ({ user }: { user: ExtendedUser }) => {
	const users = await getAllUsers();
	const friends = await getAllFriends(user.id!)

	if (!users || !friends) return "";

	return (
		<div>
			<SearchFriends user={user} users={users} />
			<FriendsList friends={friends} />
		</div>
	);
};

export default FriendsMenu;

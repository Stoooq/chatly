import { ExtendedUser } from "../../../../next-auth";
import { getAllFriends } from "@/data/friend";
import FriendsList from "../home/FriendsList";

const Users = async ({ user }: { user: ExtendedUser }) => {
	const friends = await getAllFriends(user.id!);

	if (!friends) return "";

	return (
		<div className="bg-red-400">
      users
		</div>
	);
};

export default Users;

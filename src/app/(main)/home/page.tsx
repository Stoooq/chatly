import { auth } from "@/auth";
import FriendRequests from "@/components/main/FriendRequests";
import SearchFriends from "@/components/main/SearchFriends";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";

const HomePage = async () => {
	const session = await auth();
	const user = session?.user;

	const users = await db.user.findMany();

	if (!user || !users) return <p>Loading</p>;

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<Card className="col-span-1 h-[200px]">
				<CardHeader>
					<CardTitle>Friends</CardTitle>
				</CardHeader>
				<CardContent>
					<SearchFriends user={user} users={users} />
				</CardContent>
			</Card>
			<Card className="col-span-2">
				<CardHeader>
					<CardTitle>Friend requests</CardTitle>
				</CardHeader>
				<CardContent>
					<FriendRequests user={user} />
				</CardContent>
			</Card>
		</div>
	);
};

export default HomePage;

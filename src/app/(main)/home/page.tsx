import { auth } from "@/auth";
import FriendRequests from "@/components/main/home/FriendRequests";
import FriendsMenu from "@/components/main/home/FriendsMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db";

const HomePage = async () => {
	const session = await auth();
	const user = session?.user;

	if (!user) return "";

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<Card className="col-span-1 row-span-2">
				<CardHeader>
					<CardTitle className="mx-auto">Friends</CardTitle>
				</CardHeader>
				<CardContent>
					<FriendsMenu user={user} />
				</CardContent>
			</Card>
			<Card className="col-span-2">
				<CardHeader>
					<CardTitle className="mx-auto">Friend requests</CardTitle>
				</CardHeader>
				<CardContent>
					<FriendRequests user={user} />
				</CardContent>
			</Card>
		</div>
	);
};

export default HomePage;

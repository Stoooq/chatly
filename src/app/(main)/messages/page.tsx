import { auth } from "@/auth";
import Users from "@/components/main/messages/Users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MessagesPage = async () => {
	const session = await auth();
	const user = session?.user;

	if (!user) return "";

	return (
		<div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
			<Card className="col-span-1 bg-yellow-50 flex flex-col">
				<CardHeader>
					<CardTitle>Users</CardTitle>
				</CardHeader>
				<CardContent className="bg-blue-300 flex-grow">
					<Users user={user} />
				</CardContent>
			</Card>
			<Card className="col-span-2">
				<CardHeader>
					<CardTitle></CardTitle>
				</CardHeader>
				<CardContent></CardContent>
			</Card>
		</div>
	);
};

export default MessagesPage;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MessagesPage = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<Card className="col-span-1">
				<CardHeader>
					<CardTitle>Users</CardTitle>
				</CardHeader>
				<CardContent>
				</CardContent>
			</Card>
			<Card className="col-span-2">
				<CardHeader>
					<CardTitle></CardTitle>
				</CardHeader>
				<CardContent>
				</CardContent>
			</Card>
		</div>
	);
};

export default MessagesPage;

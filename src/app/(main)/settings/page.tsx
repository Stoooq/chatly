import UserSettings from "@/components/main/settings/UserSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SettingsPage = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<Card className="col-span-2">
				<CardHeader>
					<CardTitle>User Informations</CardTitle>
				</CardHeader>
				<CardContent>
					<UserSettings />
				</CardContent>
			</Card>
		</div>
	);
};

export default SettingsPage;

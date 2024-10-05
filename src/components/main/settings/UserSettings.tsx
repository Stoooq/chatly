import { auth } from "@/auth";
import UserSettingsForm from "./UserSettingsForm";

const UserSettings = async () => {
	const session = await auth();
	const user = session?.user;

	return (
		<div>
			<div className="flex justify-between mb-4">
				<p>ID</p>
				<p className="text-sm font-mono p-1 bg-zinc-100 transition-colors rounded-md">
					{user?.id}
				</p>
			</div> 
            {/* TEMPORARY */}
			<div className="flex justify-between mb-4">
				<p>Name</p>
				<p className="text-sm font-mono p-1 bg-zinc-100 transition-colors rounded-md">
					{user?.name}
				</p>
			</div>
			<div className="flex justify-between mb-4">
				<p>Email</p>
				<p className="text-sm font-mono p-1 bg-zinc-100 transition-colors rounded-md">
					{user?.email}
				</p>
			</div>
			<div className="flex justify-between mb-4">
				<p>2FA</p>
				<p className="text-sm font-mono p-1 bg-zinc-100 transition-colors rounded-md">
					{user?.isTwoFactorEnabled ? "ON" : "OFF"}
				</p>
			</div>
			<div className="flex justify-center">
				<UserSettingsForm user={user!} />
			</div>
		</div>
	);
};

export default UserSettings;

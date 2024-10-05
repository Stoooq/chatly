"use client";

import { useMemo, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { friendRequest } from "@/actions/friend-request";
import { useToast } from "@/hooks/use-toast";
import { User } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { ExtendedUser } from "../../../../next-auth";
import { Button } from "@/components/ui/button";

const SearchFriends = ({ user, users }: { user: ExtendedUser, users: User[] }) => {
	const [searchName, setSearchName] = useState("");

	const { toast } = useToast();

	const filteredUsers = useMemo(() => {
		if (!searchName.trim() || !users) return users;

		return users
			.filter((user) =>
				user.name!.toLowerCase().includes(searchName.toLowerCase())
			)
			.sort((user1, user2) => {
				const nameA = user1.name!.toLowerCase();
				const nameB = user2.name!.toLowerCase();
				const term = searchName.toLowerCase();

				if (nameA.startsWith(term) && !nameB.startsWith(term)) {
					return -1;
				}
				if (!nameA.startsWith(term) && nameB.startsWith(term)) {
					return 1;
				}

				return nameA.localeCompare(nameB);
			});
	}, [searchName, users]);

	const inviteUser = (id: string) => {
		friendRequest(user?.id!, id)
			.then((data) => {
				if (data?.error) {
					toast({
						variant: "destructive",
						title: data.error,
					});
				}
				if (data?.success) {
					toast({
						variant: "default",
						title: data.success,
					});
				}
			})
			.catch(() => {
				toast({
					variant: "destructive",
					title: "Something went wrong",
				});
			});
	};

	return (
		<div>
			<Dialog onOpenChange={() => setSearchName("")}>
				<DialogTrigger asChild>
					<Button className="w-full">Search</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Find new friends</DialogTitle>
						<DialogDescription>cos</DialogDescription>
					</DialogHeader>
					<Input
						placeholder="Search ..."
						onChange={(e) => setSearchName(e.target.value)}
					/>
					{filteredUsers && filteredUsers?.length > 0 && searchName ? (
						<>
							{filteredUsers.map((user) => (
								<div key={user.name}>
									{user.name}
									<Button onClick={() => inviteUser(user.id!)}>invite</Button>
								</div>
							))}
						</>
					) : (
						<div>Type to find</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SearchFriends;

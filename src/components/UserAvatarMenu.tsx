"use client"

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ExtendedUser } from "../../next-auth";

const UserAvatarMenu = ({ user }: { user: ExtendedUser }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="cursor-pointer">
					{!user?.image ? (
						<AvatarFallback>?</AvatarFallback>
					) : (
						<AvatarImage src={user?.image} />
					)}
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" side="bottom">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>cos3</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut className="mr-2 h-4 w-4" />
					<button onClick={() => signOut()}>Sign Out</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserAvatarMenu;

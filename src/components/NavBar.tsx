import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import UserAvatarMenu from "./UserAvatarMenu";
import { auth } from "@/auth";

const NavBar = async () => {
	const session = await auth()

	return (
		<div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
			<header className="relative bg-white">
				<MaxWidthWrapper>
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							<div className="ml-4 flex lg:ml-0">
								<Link href="/">
									<MessageSquareText size={35} className="text-gray-900" />
								</Link>
							</div>
							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									{session?.user ? (
										<UserAvatarMenu user={session.user} />
									) : (
										<>
											<div>Sign in</div>
											<div>Sign up</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
};

export default NavBar;

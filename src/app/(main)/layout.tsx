import { ReactNode } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SlideTabs from "@/components/main/SlideTabs";
import UserAvatarMenu from "@/components/UserAvatarMenu";
import { auth } from "@/auth";

const layout = async ({ children }: { children: ReactNode }) => {
	const session = await auth();
	const user = session?.user;

	return (
		<MaxWidthWrapper>
			<div className="pt-12 space-y-8">
				<div className="flex space-x-8">
					<div className="my-auto bg-white p-3 rounded-xl shadow-md">
						<UserAvatarMenu user={user!} />
					</div>
					<SlideTabs />
				</div>
				<div className="w-full rounded-xl">{children}</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default layout;

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NavBar from "@/components/NavBar";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<NavBar />
			<MaxWidthWrapper>
				<div className="relative py-32 mx-auto text-center flex flex-col items-center max-w-3xl">
					<div className="bg-[linear-gradient(to_right,#404cff_0%,#9965ff_70%,#e2e9ff)] absolute left-0 top-16 w-[300px] h-[300px] blur-xl rounded-full -z-10 opacity-50" />
					<div className="absolute left-1/3 top-1/3 w-[150px] h-[150px] bg-[linear-gradient(to_left,#404cff_0%,#9965ff_70%,#e2e9ff)] blur-xl rounded-full -z-10 opacity-50" />

					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						Connect and <span className="text-blue-600">message</span> with
						ease.
					</h1>
					<p className="mt-6 text-lg max-w-prose text-muted-foreground">
						Chatly is a simple and fast messaging app for connecting with
						others. It offers secure communication, group chats, and easy ways
						to make new connections.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 mt-6">
						<Link href="/products" className={buttonVariants()}>
							Browse Trending
						</Link>
						<Button variant="ghost">Our quality promise &rarr;</Button>
					</div>
				</div>
			</MaxWidthWrapper>
		</>
	);
}

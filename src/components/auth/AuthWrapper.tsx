import React, { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface AuthWrapperProps {
	children: ReactNode;
	headerLabel: string;
    headerParagrapf: string;
	backButtonLabel: string;
	backButtonHref: string;
}

const AuthWrapper = ({
	children,
	headerLabel,
    headerParagrapf,
	backButtonLabel,
	backButtonHref,
}: AuthWrapperProps) => {
	return (
		<Card className="w-[26rem]">
			<CardHeader>
				<div className="w-full flex flex-col gap-y-4 items-center justify-center">
					<h1 className="text-3xl font-semibold">{headerLabel}</h1>
					<p className="text-muted-foreground text-sm">{headerParagrapf}</p>
				</div>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter>
				<Button variant="link" className="font-normal w-full size-sm asChild">
					<Link href={backButtonHref}>{backButtonLabel}</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default AuthWrapper;

"use client";

import { emailVerification } from "@/actions/email-verification";
import AuthWrapper from "@/components/auth/AuthWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const EmailVerificationPage = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const onSubmit = useCallback(() => {
		if (!token) {
			return;
		}
		emailVerification(token)
	}, [token]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<MaxWidthWrapper className="flex min-h-screen items-center justify-center">
			<AuthWrapper
				headerLabel="Confirming your verification"
				headerParagrapf=""
				backButtonLabel="Back to login"
				backButtonHref="/sign-in"
			>
				{""}
			</AuthWrapper>
		</MaxWidthWrapper>
	);
};

export default EmailVerificationPage;

"use client";

import { passwordReset } from "@/actions/password-reset";
import AuthWrapper from "@/components/auth/AuthWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResetPasswordPage = () => {
	const [isPending, startTransition] = useTransition();

	const { toast } = useToast()

	const form = useForm<z.infer<typeof ResetSchema>>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = (values: z.infer<typeof ResetSchema>) => {
		startTransition(() => {
			passwordReset(values).then((data) => {
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
				form.reset();
			})
			.catch(() => {
				toast({
					variant: "destructive",
					title: "Something went wrong",
				});
			});
		});
	};

	return (
		<MaxWidthWrapper className="flex min-h-screen items-center justify-center">
			<AuthWrapper
				headerLabel="Reset password"
				headerParagrapf="Forgot your password?"
				backButtonLabel="Back to login"
				backButtonHref="/sign-in"
			>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder="example@domain.com"
												type="email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" disabled={isPending} className="w-full">
							Send reset email
						</Button>
					</form>
				</Form>
			</AuthWrapper>
		</MaxWidthWrapper>
	);
};

export default ResetPasswordPage;

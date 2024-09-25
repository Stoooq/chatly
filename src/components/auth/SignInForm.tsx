"use client";

import { login } from "@/actions/login";
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
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignInForm = () => {
	const [isPending, startTransition] = useTransition();

	const { toast } = useToast();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		startTransition(() => {
			login(values)
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
				headerLabel="Login"
				headerParagrapf="Welcome back"
				backButtonLabel="Don't have account ?"
				backButtonHref="/sign-up"
			>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-6 flex flex-col">
							<>
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
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isPending}
													placeholder="******"
													type="password"
												/>
											</FormControl>
											<Button
												size="sm"
												variant="link"
												asChild
												className="px-0 font-normal"
											>
												<Link href="/reset-password">Forgot password?</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						</div>
						<Button type="submit" disabled={isPending} className="w-full">
							Login
						</Button>
					</form>
				</Form>
			</AuthWrapper>
		</MaxWidthWrapper>
	);
};

export default SignInForm;

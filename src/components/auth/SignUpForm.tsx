"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/actions/register";
import { useTransition } from "react";
import AuthWrapper from "@/components/auth/AuthWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useToast } from "@/hooks/use-toast";

const SignUpForm = () => {
	const [isPending, startTransition] = useTransition();

	const { toast } = useToast();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		startTransition(() => {
			register(values)
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
				headerLabel="Register"
				headerParagrapf="Create an account"
				backButtonLabel="Already have an account?"
				backButtonHref="/sign-in"
			>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder="Name"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" disabled={isPending} className="w-full">
							Register
						</Button>
					</form>
				</Form>
			</AuthWrapper>
		</MaxWidthWrapper>
	);
};

export default SignUpForm;

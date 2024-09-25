"use client"

import { newPassword } from "@/actions/new-password";
import AuthWrapper from "@/components/auth/AuthWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewPasswordPage = () => {
    const searchParams = useSearchParams()
	const token = searchParams.get("token")

    const { toast } = useToast()

	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		startTransition(() => {
			newPassword(values, token).then((data) => {
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
							Reset password
						</Button>
					</form>
				</Form>
			</AuthWrapper>
		</MaxWidthWrapper>
	);
};

export default NewPasswordPage;

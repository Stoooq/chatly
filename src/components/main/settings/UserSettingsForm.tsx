"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";
import { settings } from "@/actions/settings";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { ExtendedUser } from "../../../../next-auth";

const UserSettingsForm = ({ user }: { user: ExtendedUser }) => {
	const [isPending, startTransition] = useTransition();

	const { toast } = useToast();

	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
		},
	});

	const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
		// Sprawdzamy, czy pola 'password' i 'newPassword' są puste, jeśli tak, ustawiamy je na undefined
		const updatedValues = {
			...values,
			password: values.password === "" ? undefined : values.password,
			newPassword: values.newPassword === "" ? undefined : values.newPassword,
		};

		startTransition(() => {
			settings(updatedValues)
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
		<Dialog
			onOpenChange={() => {
				form.reset();
			}}
		>
			<DialogTrigger asChild>
				<Button variant="secondary" className="text-md">
					Change User Settings
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[400px]">
				<DialogHeader className="mb-4">
					<DialogTitle className="text-2xl">Edit Profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-6"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Name" disabled={isPending} />
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
											placeholder="example.dot@email.com"
											type="email"
											disabled={isPending}
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
											placeholder="******"
											type="password"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="******"
											type="password"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isTwoFactorEnabled"
							render={({ field }) => (
								<FormItem className="flex justify-between">
									<div>
										<FormLabel>Two Factor Authentication</FormLabel>
										<FormDescription>
											Enable two factor authentication
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											disabled={isPending}
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button variant="ghost" type="submit" disabled={isPending}>
							Save
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default UserSettingsForm;

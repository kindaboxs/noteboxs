"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";
import { signUpSchema, type SignUpSchema } from "@/modules/auth/schemas";

export const SignUpView = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	const [isPendign, startTransition] = useTransition();

	const router = useRouter();

	const form = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		mode: "all",
	});

	const onSubmitForm = async (data: SignUpSchema) => {
		startTransition(async () => {
			await authClient.signUp.email({
				name: data.name,
				email: data.email,
				password: data.password,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Account created successfully", {
							description: "You can now sign in",
						});

						router.push("/sign-in");
					},
					onError: (ctx) => {
						toast.error("Oops! Sign up failed", {
							description: ctx.error.message,
						});
					},
				},
			});
		});
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create an account</CardTitle>
					<CardDescription>Let&apos;s create your account</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmitForm)}
							className="grid gap-6"
						>
							<div className="grid gap-6">
								<FormField
									name="name"
									control={form.control}
									render={({ field }) => (
										<FormItem className="grid gap-3">
											<FormLabel htmlFor="name">Name</FormLabel>
											<FormControl>
												<Input
													id="name"
													type="text"
													placeholder="Kotak"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="email"
									control={form.control}
									render={({ field }) => (
										<FormItem className="grid gap-3">
											<FormLabel htmlFor="email">Email</FormLabel>
											<FormControl>
												<Input
													id="email"
													type="email"
													placeholder="m@example.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="password"
									control={form.control}
									render={({ field }) => (
										<FormItem className="grid gap-3">
											<FormLabel htmlFor="password">Password</FormLabel>
											<FormControl>
												<Input
													id="password"
													type="password"
													required
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit" className="w-full" disabled={isPendign}>
									{isPendign ? (
										<>
											<Loader2Icon className="size-4 animate-spin" />
											Signing up...
										</>
									) : (
										"Sign up"
									)}
								</Button>
							</div>

							<div className="text-center text-sm">
								Already have an account?{" "}
								<Link href="/sign-in" className="underline underline-offset-4">
									Sign in
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>

			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
};

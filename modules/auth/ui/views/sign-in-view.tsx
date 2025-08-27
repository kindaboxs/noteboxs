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
import { signInSchema, type SignInSchema } from "@/modules/auth/schemas";

export const SignInView = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "all",
	});

	const onSubmitForm = async (data: SignInSchema) => {
		startTransition(async () => {
			await authClient.signIn.email({
				email: data.email,
				password: data.password,
				fetchOptions: {
					onSuccess: () => {
						router.push("/");
					},
					onError: (ctx) => {
						toast.error("Oops! Sign in failed", {
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
					<CardTitle className="text-xl">Welcome back!</CardTitle>
					<CardDescription>Let&apos;s sign you in</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmitForm)}
							className="grid gap-6"
						>
							<div className="grid gap-6">
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
											<div className="flex items-center">
												<FormLabel htmlFor="password">Password</FormLabel>
												<Link
													href="#"
													className="ml-auto text-sm underline-offset-4 hover:underline"
												>
													Forgot your password?
												</Link>
											</div>
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

								<Button type="submit" className="w-full" disabled={isPending}>
									{isPending && <Loader2Icon className="size-4 animate-spin" />}
									Sign in
								</Button>
							</div>

							<div className="text-center text-sm">
								Don&apos;t have an account?{" "}
								<Link href="/sign-up" className="underline underline-offset-4">
									Sign up
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

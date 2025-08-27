"use client";

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

export default function DashboardPage() {
	const { data: session, isPending } = authClient.useSession();

	const router = useRouter();

	const onSignOutButton = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/");
				},
			},
		});
	};

	useEffect(() => {
		if (!session) redirect("/sign-in");
	}, [router, session]);

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>DashboardPage</h1>
			{session && <pre>{JSON.stringify(session, null, 2)}</pre>}
			<Button onClick={onSignOutButton}>Sign out</Button>
		</div>
	);
}

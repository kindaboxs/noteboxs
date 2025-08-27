import Link from "next/link";

import { BoxsIcon } from "@/components/globals/boxs-icon";

export default function LoginPage({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-svh min-w-svw gap-6 px-6 py-16 md:px-10">
			<div className="mx-auto flex w-full max-w-sm flex-col gap-6">
				<Link
					href="#"
					className="flex items-center gap-2 self-center text-2xl font-bold"
				>
					<div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
						<BoxsIcon className="size-6" />
					</div>
					NoteBoxs
				</Link>
				{children}
			</div>
		</div>
	);
}

import Link from "next/link";

import { Button } from "@/components/ui/button";

export const HomeCallToActionSection = () => {
	return (
		<section className="py-16 md:py-32">
			<div className="mx-auto max-w-5xl px-6">
				<div className="text-center">
					<h2 className="text-4xl font-semibold text-balance lg:text-5xl">
						Your brain deserves a home.
					</h2>
					<p className="mt-4">
						Stop losing ideas to messy docs or sticky notes. start your own
						space today.
					</p>

					<div className="mt-12 flex flex-wrap justify-center gap-4">
						<Button asChild size="lg">
							<Link href="/">
								<span>Get Started</span>
							</Link>
						</Button>

						<Button asChild size="lg" variant="outline">
							<Link href="/">
								<span>View demo</span>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

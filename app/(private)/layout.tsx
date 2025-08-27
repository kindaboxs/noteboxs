import { PrivateNavbar } from "@/components/globals/private-navbar";
import { PrivateSidebar } from "@/components/globals/private-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function PrivateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<PrivateSidebar />
			<SidebarInset>
				<PrivateNavbar />
				<div className="flex min-h-svh w-full flex-1 flex-col gap-4 p-4">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

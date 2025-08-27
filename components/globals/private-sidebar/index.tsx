import { type ComponentProps } from "react";

import { PrivateSidebarContent } from "@/components/globals/private-sidebar/private-sidebar-content";
import { PrivateSidebarFooter } from "@/components/globals/private-sidebar/private-sidebar-footer";
import { PrivateSidebarHeader } from "@/components/globals/private-sidebar/private-sidebar-header";
import { sidebarMockdata } from "@/components/globals/private-sidebar/sidebar-mockdata";
import { Sidebar, SidebarRail } from "@/components/ui/sidebar";

export function PrivateSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<PrivateSidebarHeader
				versions={sidebarMockdata.versions}
				defaultVersion={sidebarMockdata.versions[0]}
			/>

			<PrivateSidebarContent data={sidebarMockdata} />

			<PrivateSidebarFooter />

			<SidebarRail />
		</Sidebar>
	);
}

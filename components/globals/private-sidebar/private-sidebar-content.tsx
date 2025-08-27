import { ChevronRight } from "lucide-react";

import { type sidebarMockdata } from "@/components/globals/private-sidebar/sidebar-mockdata";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

interface Props {
	data: typeof sidebarMockdata;
}

export const PrivateSidebarContent = ({ data }: Props) => {
	return (
		<SidebarContent className="gap-0">
			{/* We create a collapsible SidebarGroup for each parent. */}
			{data.navMain.map((item) => (
				<Collapsible
					key={item.title}
					title={item.title}
					defaultOpen
					className="group/collapsible"
				>
					<SidebarGroup>
						<SidebarGroupLabel
							asChild
							className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
						>
							<CollapsibleTrigger>
								{item.title}{" "}
								<ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									{item.items.map((item) => (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton asChild isActive={item.isActive}>
												<a href={item.url}>{item.title}</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
			))}
		</SidebarContent>
	);
};

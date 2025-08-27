import { SidebarHeader } from "@/components/ui/sidebar";

import { PrivateSidebarSearchForm } from "./private-sidebar-search-form";
import { PrivateSidebarVersionSwitcher } from "./private-sidebar-version-switcher";

interface Props {
	versions: string[];
	defaultVersion: string;
}

export const PrivateSidebarHeader = ({ versions, defaultVersion }: Props) => {
	return (
		<SidebarHeader>
			<PrivateSidebarVersionSwitcher
				versions={versions}
				defaultVersion={defaultVersion}
			/>
			<PrivateSidebarSearchForm />
		</SidebarHeader>
	);
};

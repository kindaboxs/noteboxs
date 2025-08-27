"use client";

import { useRouter } from "next/navigation";

import { IconDotsVertical, IconLogout } from "@tabler/icons-react";
import { ChevronsUpDown, LogOutIcon } from "lucide-react";

import { GeneratedAvatar } from "@/components/globals/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/client";
import { type Session } from "@/lib/auth/types";

const AvatarUser = ({ user }: { user: Session["user"] }) => {
	if (!user.image) {
		return (
			<GeneratedAvatar
				seed={user.name}
				style="notionistsNeutral"
				className="size-8 rounded-lg"
			/>
		);
	}

	return (
		<Avatar className="size-8 rounded-lg">
			<AvatarImage src={user.image} alt={user.name} />
			<AvatarFallback className="size-8 rounded-lg uppercase">
				{user.name.charAt(0)}
			</AvatarFallback>
		</Avatar>
	);
};

const NavUser = ({
	user,
	onSignOut,
	isMobile,
}: {
	user: Session["user"];
	onSignOut: () => void;
	isMobile: boolean;
}) => {
	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger asChild>
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
					>
						<AvatarUser user={user} />
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{user.name}</span>
							<span className="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDown className="ml-auto size-4" />
					</SidebarMenuButton>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader className="font-normal">
						<div className="flex items-center gap-2 text-left text-sm">
							<AvatarUser user={user} />
							<div className="grid flex-1 text-left text-sm leading-tight">
								<DrawerTitle className="truncate font-semibold">
									{user.name}
								</DrawerTitle>
								<DrawerDescription className="truncate text-xs">
									{user.email}
								</DrawerDescription>
							</div>
						</div>
					</DrawerHeader>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant="default" onClick={onSignOut} className="w-full">
								<LogOutIcon />
								Sign out
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<AvatarUser user={user} />
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{user.name}</span>
						<span className="text-muted-foreground truncate text-xs">
							{user.email}
						</span>
					</div>
					<IconDotsVertical className="ml-auto size-4" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				side="right"
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<AvatarUser user={user} />
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">{user.name}</span>
							<span className="text-muted-foreground truncate text-xs">
								{user.email}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onSignOut}>
					<IconLogout />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const PrivateSidebarFooter = () => {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();
	const { isMobile } = useSidebar();

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/sign-in");
				},
			},
		});
	};

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					{isPending && <Skeleton className="h-12 w-full" />}
					{session && (
						<NavUser
							user={session.user}
							onSignOut={handleSignOut}
							isMobile={isMobile}
						/>
					)}
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
};

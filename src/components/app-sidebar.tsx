"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { checkAuth } from "@/utility/auth";
import { Icon } from "lucide-react";
const { user } = await checkAuth();

const navMainItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: IconDashboard,
  },
  // {
  //   title: "Lifecycle",
  //   url: "#",
  //   icon: IconListDetails,
  // },
  // {
  //   title: "Analytics",
  //   url: "#",
  //   icon: IconChartBar,
  // },
  // {
  //   title: "Projects",
  //   url: "#",
  //   icon: IconFolder,
  // },
  // {
  //   title: "Add Doctor",
  //   url: "add-doctor",
  //   icon: IconUsers,
  // },
];

if (user?.role === "ADMIN") {
  navMainItems.push(
    {
      title: "Manage doctors",
      url: "/dashboard/admin/manage-doctors",
      icon: IconSettings,
    },
    {
      title: "Manage Patients",
      url: "/dashboard/admin/manage-patients",
      icon: IconUsers,
    }
  );
}
const data = {
  user: {
    name: user?.name || "Guest",
    email: user?.email || "guest@example.com",
    avatar: user?.avatar || "/avatars/default.jpg",
  },
  navMain: navMainItems,
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

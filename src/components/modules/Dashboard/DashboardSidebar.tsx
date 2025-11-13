import { NavSection } from "@/components/types/dashboard.interface";
import { UserInfo } from "@/components/types/user.interface";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getUserInfo } from "@/service/auth/getUserInfo";
import React from "react";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;

  const navItems: NavSection[] = [];
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <div>
      <DashboardSidebarContent
        userInfo={userInfo}
        navItems={navItems}
        dashboardHome={dashboardHome}
      />
    </div>
  );
};

export default DashboardSidebar;

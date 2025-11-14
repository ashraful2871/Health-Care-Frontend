import React from "react";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { getUserInfo } from "@/service/auth/getUserInfo";
import { UserInfo } from "@/components/types/user.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { NavSection } from "@/components/types/dashboard.interface";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);
  return (
    <div>
      <DashboardNavbarContent
        userInfo={userInfo}
        navItems={navItems}
        dashboardHome={dashboardHome}
      />
    </div>
  );
};

export default DashboardNavbar;

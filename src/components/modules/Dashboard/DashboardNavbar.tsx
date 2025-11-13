import React from "react";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { getUserInfo } from "@/service/auth/getUserInfo";
import { UserInfo } from "@/components/types/user.interface";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  return (
    <div>
      <DashboardNavbarContent userInfo={userInfo} />
    </div>
  );
};

export default DashboardNavbar;

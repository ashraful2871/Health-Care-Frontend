import LogoutButton from "@/components/shared/LogoutButton";
import { getCookie } from "@/service/auth/cookiesHandler";
import React from "react";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const accessToken = await getCookie("accessToken");
  return (
    <div>
      {accessToken && <LogoutButton />}
      <div>{children}</div>
    </div>
  );
};

export default CommonDashboardLayout;

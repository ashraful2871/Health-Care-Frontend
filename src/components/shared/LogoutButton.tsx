"use client";

import { logoutUser } from "@/service/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <Button
      className="cursor-pointer"
      variant="destructive"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;

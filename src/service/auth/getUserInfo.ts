/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { UserInfo } from "@/types/user.interface";
import { getCookie } from "./cookiesHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { serverFetch } from "@/lib/server-fetch";

export const getUserInfo = async (): Promise<UserInfo | any> => {
  let userInfo: UserInfo | any;
  try {
    const response = await serverFetch.get("/auth/me", {
      cache: "force-cache",
      next: { tags: ["user-info"] },
    });
    const result = await response.json();
    if (result.success) {
      const accessToken = await getCookie("accessToken");
      if (!accessToken) {
        throw new Error("No Access Token Found.");
      }
      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      userInfo = {
        name: verifiedToken.name || "Unknown User",
        email: verifiedToken.email,
        role: verifiedToken.role,
      };
    }
    userInfo = {
      name:
        result.data.admin?.name ||
        result.data.doctor?.name ||
        result.data.patient?.name ||
        result.data.name ||
        "Unknown User",
      ...result.data,
    };

    return userInfo;
  } catch (error: any) {
    console.log(error);
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "PATIENT",
    };
  }
};

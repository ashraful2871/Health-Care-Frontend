"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { resetPasswordSchema } from "@/zod/auth.validation";
import { revalidateTag } from "next/cache";
import { getCookie } from "./cookiesHandler";
import jwt from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth-utils";
import { getUserInfo } from "./getUserInfo";
import { redirect } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateMyProfile(formData: FormData) {
  try {
    const uploadForFData = new FormData();
    const data: any = {};
    formData.forEach((value, key) => {
      if (key !== "file" && value) {
        data[key] = value;
      }
    });

    uploadForFData.append("data", JSON.stringify(data));
    const file = formData.get("file") as File;
    if (file && file instanceof File && file.size > 0) {
      uploadForFData.append("file", file);
    }

    const response = await serverFetch.patch("/user/update-my-profile", {
      body: uploadForFData,
    });

    const result = await response.json();

    revalidateTag("user-info", { expire: 0 });

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function resetPassword(_prevState: any, formData: FormData) {
  const redirectTo = formData.get("redirect") || null;

  // Build validation payload
  const validationPayload = {
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validatedPayload = zodValidator(validationPayload, resetPasswordSchema);

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    const verifiedToken = jwt.verify(
      accessToken as string,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    const userRole: UserRole = verifiedToken.role;

    const user = await getUserInfo();
    console.log({ id: user?.id, newPassword: validationPayload.newPassword });
    const response = await serverFetch.post("/auth/reset-password", {
      body: JSON.stringify({
        id: user?.id,
        newPassword: validationPayload.newPassword,
      }),

      headers: {
        Authorization: accessToken,
        "content-type": "application/json",
      },
    });
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Reset password failed");
    }

    if (result.success) {
      // await get
      revalidateTag("user-info", "max");
    }

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message: error?.message || "Something went wrong",
      formData: validationPayload,
    };
  }
}

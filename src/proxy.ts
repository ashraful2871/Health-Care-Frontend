import next from "next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface UserInterface {
  id: string;
  email: string;
  role: "ADMIN" | "PATIENT" | "DOCTOR";
  exp: number;
  lat: number;
}

const roleBasedRoutes = {
  ADMIN: ["/admin/dashboard"],
  DOCTOR: ["/doctor/dashboard"],
  PATIENT: [
    "/patient/dashboard",
    "/patient/appointments",
    "/patient/medical-records",
  ],
};

const authRoutes = ["/login", "/register", "/forgot-password"];
export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  if (!accessToken && !refreshToken && !authRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }
  let user: UserInterface | null = null;
  if (accessToken) {
    try {
      user = jwtDecode(accessToken);
      console.log(user);
    } catch (error) {
      console.log(error);
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/forgot-password"],
};

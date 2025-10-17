import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl;

  // Agar user logged in hai aur '/auth' par jaana chahta hai, toh usko '/' par redirect karo.
  if (token && url.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Agar user logged in nahi hai aur '/'' par jaana chahta hai, toh usko '/auth' par redirect karo.
  if (!token && url.pathname === "/") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth"], // Middleware sirf in paths par chalega.
};

import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const session = await auth();
    const isAuthenticated = !!session?.user;

    const publicPaths = ["/", "/dashboard", "/signup", "/login"];

    if (!isAuthenticated && !publicPaths.includes(pathname)) {

        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();

};

export const config = {
  matcher: [
    "/dashboard",
    "/login",
    "/signup",
    // "/create-item/:path*",
    // "/update-item/:path*",
    // "/delete-item/:path*",
  ],
};

export default middleware;

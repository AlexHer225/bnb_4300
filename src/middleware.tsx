import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const session = await auth();
    const isAuthenticated = !!session?.user;

    const publicPaths = ["/", "/signup", "/login"];

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

  // If the requested path is unknown (not matching an existing route), redirect to /not-found
  const isValidPath = pathname !== "/not-found"; // Avoid redirecting to /not-found recursively
    if (!isValidPath) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    return NextResponse.next();
};

export const config = {
  matcher: [
    "/my-dashboard",
    "/login",
    "/signup",
    // "/create-item/:path*",
    // "/update-item/:path*",
    // "/delete-item/:path*",
  ],
};

export default middleware;

// import { NextRequest, NextResponse } from "next/server";

// const middleware = (request: NextRequest) => {
//     const { pathname } = request.nextUrl;

//     console.log(`Restricted route hit: ${pathname}`);
//     console.log("can't go here!");
//     return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//     matcher: [
//         // "/items",
//         // "/items/id",
//         // "/create-item",
//         // "/udpate-item",
//     ]    
// };

// export default middleware;

///////////////////////////////////////////////////////////////////////////
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, pathname); 

    const publicPaths = ["/", "/dashboard", "/signup", "/login"];

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
 
};

export const config = {
  matcher: [
    // "/create-item/:path*",
    // "/update-item/:path*",
    // "/delete-item/:path*",
  ],
};

export default middleware;

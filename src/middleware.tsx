import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl;

    console.log(`Restricted route hit: ${pathname}`);
    console.log("can't go here!");
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: [
        // "/items",
        // "/items/id",
        // "/create-item",
        // "/udpate-item",
    ]    
};

export default middleware;
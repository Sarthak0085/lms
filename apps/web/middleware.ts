// import { adminRoutes, apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes";
import { UserRole } from "@repo/db/types";
import { auth } from "./auth";
import { adminRoutes, privateRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT } from "./routes";

//@ts-ignore
export default auth((req) => {
    console.log("middleware");
    const { nextUrl } = req;
    const session = req.auth;
    console.log("token", session);

    const isLoggedIn = !!session;
    console.log("isLoggedIn", isLoggedIn);

    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

    // if (isApiAuthRoute) {
    //     return null;
    // }

    if (!isAuthRoute && !isAdminRoute && !isPrivateRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && !isPrivateRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackURL = encodeURIComponent(callbackUrl);
        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackURL}`, nextUrl));
    }

    if (isAdminRoute) {
        console.log("is Admin route", session)
        if (!isLoggedIn) {
            return Response.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`, nextUrl));
        }
        if (session?.user?.role !== UserRole.ADMIN) {
            return Response.redirect(new URL('/', nextUrl));
        }
        return null;
    }

    return null;
}) as any;


export const config = {
    matcher: [
        // Apply to all routes except Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
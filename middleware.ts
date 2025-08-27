import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { auth } from "@/lib/auth";

const authRoutes = ["/sign-in", "/sign-up"];
const privateRoutes = ["/dashboard"];

export default async function middleware(req: NextRequest) {
	const { nextUrl } = req;
	const { pathname } = req.nextUrl;

	const isAuthRoute = authRoutes.includes(pathname);
	const isPrivateRoute = privateRoutes.includes(pathname);

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (isAuthRoute) {
		// if user is authenticated, redirect to dashboard
		if (session) {
			return NextResponse.redirect(new URL("/dashboard", req.url));
		}

		return NextResponse.next();
	}

	// if user is not authenticated, redirect to sign-in with callback to the current page
	if (!session && isPrivateRoute) {
		let callbackUrl = pathname;

		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl);

		return NextResponse.redirect(
			new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, req.url)
		);
	}

	return NextResponse.next();
}

export const config = {
	runtime: "nodejs",
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. all root files inside /public (e.g. /favicon.ico)
		 */
		"/((?!api|_next|[\\w-]+\\.\\w+).*)",
	],
};

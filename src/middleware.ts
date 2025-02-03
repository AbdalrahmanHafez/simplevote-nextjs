import { headers } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const idToRequestCount = new Map<string, number>(); // keeps track of individual users
const rateLimiter = {
	windowStart: Date.now(),
	windowSize: 60 * 1000, // Milliseconds (currently 1 Hour)
	maxRequests: 50,
};

export const rateLimit = (ip: string) => {
	// Check and update current window
	const now = Date.now();
	const isNewWindow = now - rateLimiter.windowStart > rateLimiter.windowSize;
	if (isNewWindow) {
		rateLimiter.windowStart = now;
		idToRequestCount.set(ip, 0);
	}

	// Check and update current request limits
	const currentRequestCount = idToRequestCount.get(ip) ?? 0;
	if (currentRequestCount >= rateLimiter.maxRequests) return true;
	idToRequestCount.set(ip, currentRequestCount + 1);

	return false;
};

export async function middleware(request: NextRequest) {
	console.log("[MIDDLEWARE] ", request.url)

	if (typeof request.headers.get("Next-Action") === "string") {

		const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
		const isRateLimited = rateLimit(ip);
		if (isRateLimited) {
			console.log("[Rate-Limiting]", ip);
			// return NextResponse.json({ "error": "Rate limit exceeded" }, { status: 429 });
			const url = request.nextUrl.clone()
			url.pathname = '/rate-limit'
			return NextResponse.redirect(url, {
				headers: {}
			})
		}
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {

	/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
 */
	matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|rate-limit).*)',

}
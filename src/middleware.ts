import { NextRequest, NextResponse } from "next/server";
import { getCanonicalConverterPath } from "@/lib/converter-routing";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length !== 2) {
    return NextResponse.next();
  }

  const [category, slug] = segments;
  const canonicalPath = getCanonicalConverterPath(category, slug);

  if (!canonicalPath || canonicalPath === pathname) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = canonicalPath;

  return NextResponse.redirect(redirectUrl, 301);
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|opengraph-image|twitter-image).*)"],
};

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.has('ACCESS_TOKEN');
  if (!hasToken) {
    return NextResponse.redirect(
      new URL(
        '/login?' + new URLSearchParams({ callback: request.nextUrl.pathname }),
        request.url
      )
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/cart'
};

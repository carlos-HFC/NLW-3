import { NextRequest, NextResponse } from 'next/server';

import { env } from "./env/env";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookie = request.cookies.get(env.COOKIE_NAME);
  const token = cookie?.value;

  const protectedRoutes = [
    "/dashboard"
  ];

  if (!token && protectedRoutes.includes(pathname)) return NextResponse.redirect(new URL("/", request.url));

  if (token && pathname === '/login') return NextResponse.redirect(new URL("/dashboard", request.url));
}
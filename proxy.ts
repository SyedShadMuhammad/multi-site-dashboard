// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// "export default" Next.js ke naye proxy rules ke mutabiq lazmi hai
export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isDashboardRoute = path === '/dashboard' || path.startsWith('/dashboard/');
  const token = request.cookies.get('auth_token')?.value;

  // Agar token nahi hai, toh dashboard se rok kar sahi login page (/login) par bhej do
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if accessing admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const isAdmin = request.cookies.has('admin_session');
        const isLoginPage = request.nextUrl.pathname === '/admin/login';

        // If trying to access admin pages (except login) and not authenticated
        if (!isAdmin && !isLoginPage) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // If trying to access login page while authenticated
        if (isAdmin && isLoginPage) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
}

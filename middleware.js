import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const config = {
  matcher: ['/dashboard/:path*', '/auth/login', '/auth/signup', '/'],
};

export async function middleware(request) {
  try {
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('Authorization')?.split(' ')[1];
    const url = request.nextUrl;
    
    const urlSegments = url.pathname.split('/dashboard/');
    const urlEmail = urlSegments.length > 1 ? urlSegments[1].split('/')[0] : undefined;

    if (!token) {
      if (url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      return NextResponse.next();
    }
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    let decodedToken;
    try {
      const { payload } = await jwtVerify(token, secret);
      decodedToken = payload;

      if (url.pathname.startsWith('/dashboard')) {
        if (url.pathname === `/dashboard/${decodedToken.email}`) {
          return NextResponse.next();
        }
        
        if (urlEmail && decodedToken.email !== urlEmail) {
          return NextResponse.redirect(
            new URL(`/dashboard/${decodedToken.email}`, request.url)
          );
        }
      }

      if (['/auth/login', '/auth/signup', '/'].includes(url.pathname)) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = `/dashboard/${decodedToken.email}`;
        return NextResponse.redirect(redirectUrl);
      }

      return NextResponse.next();

    } catch (err) {
      console.error("JWT verification failed:", err);
      if (url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      return NextResponse.next();
    }

  } catch (error) {
    console.log("Error occured: ", error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}
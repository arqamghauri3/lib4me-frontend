import { NextResponse, type NextRequest } from "next/server";


export function middleware(request: NextRequest){
    const {pathname} = request.nextUrl;
    const isSessionExist = request.cookies.get('JSESSIONID');

    const publicRoutes = (pathname == "/"|| pathname == "/auth/login" || pathname == "/auth/register")

    if(!isSessionExist && !publicRoutes){
        const url = request.nextUrl.clone()
        url.pathname = "/auth/login"
        return NextResponse.redirect(url)
    }

    if(isSessionExist && publicRoutes){
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard"
        return NextResponse.redirect(url);
    }

    return NextResponse.next()

    

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
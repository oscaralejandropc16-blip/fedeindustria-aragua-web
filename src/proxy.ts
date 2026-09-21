import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const { pathname } = request.nextUrl

  // Trampa para bots y escáneres: cualquier acceso a /admin devuelve 404 estricto
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return new NextResponse('404 Not Found', { status: 404 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  // Obtener usuario desde la sesión de Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protección del dashboard: si no hay sesión activa, expulsar a login
  if (pathname.startsWith('/panel-privado/dashboard') && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/panel-privado/login'
    return NextResponse.redirect(loginUrl)
  }

  // Si ya tiene sesión activa y visita login o la raíz del panel, llevarlo directo al dashboard
  if ((pathname === '/panel-privado/login' || pathname === '/panel-privado') && user) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/panel-privado/dashboard'
    return NextResponse.redirect(dashboardUrl)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/admin', '/panel-privado/:path*', '/panel-privado'],
}

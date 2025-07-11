// src/app/utils/supabase/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createMiddlewareClient({ req: request, res: response })

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  console.log('Middleware user:', user)
  console.log('Auth error:', error)
  console.log('Request URL:', request.url)

  if (!user || error) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return response
}
// src/middleware.ts OR middleware.ts at root (preferred)

import { type NextRequest } from 'next/server'
import { updateSession } from '@/app/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/suites/:path*',
    '/suites',
    '/bookings/:path*',
    '/bookings',
    '/room/:path*', // If you book from a single room page
  ],
}

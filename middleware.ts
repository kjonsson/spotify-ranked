import { withAuth } from 'next-auth/middleware'
import { JWT } from 'next-auth/jwt'
import {
  NextRequest,
  // NextResponse
} from 'next/server'

export interface NextRequestWithAuth extends NextRequest {
  nextauth: { token: JWT | null }
}

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      return true
    },
  },
})
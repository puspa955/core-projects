// File: src/types/next-auth.d.ts

import type { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, etc.
   */
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
    } & DefaultSession["user"] // keep other default fields
  }

  interface User extends DefaultUser {
    id: string
    email: string
    name?: string | null
    image?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}

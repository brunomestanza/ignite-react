import NextAuth from 'next-auth'

// This extends the next-auth interface, not overload it
declare module 'next-auth' {
  interface User {
    id: string
    name: string
    username: string
    email: string
    avatar_url: string
  }

  interface Session {
    user: User
  }
}

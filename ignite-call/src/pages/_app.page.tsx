import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import '../lib/dayjs'
import { globalStyles } from '../../styles/global'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/react-query'

// A função é executada aqui, porque ele não é algo que deve ser renderizado novamente em conjunto com o componente.
globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}

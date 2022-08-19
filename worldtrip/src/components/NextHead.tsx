import Head from 'next/head'

interface NextHeadProps {
  title: string
}

export function NextHead({ title }: NextHeadProps) {
  return (
    <Head>
      <title>Worldtrip | {title}</title>
    </Head>
  )
}
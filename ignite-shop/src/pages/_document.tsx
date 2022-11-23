// Tudo oque é colocado dentro do Document é carregado em TODAS as páginas da aplicação. Deve sempre se manter o mais simples possível.

import { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '../styles'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* A tag abaixo é pra fazer com que o stitches faça estilização com SSR */}
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        {/* Indica pro Next em qual lugar do HTML da aplicação vão o conteúdo das rotas de acordo com as páginas */}
        <Main />
        {/* Em qual local do HTML é carregado os scripts da página */}
        <NextScript />
      </body>
    </Html>
  )
}

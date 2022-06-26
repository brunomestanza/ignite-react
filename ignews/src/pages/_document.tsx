// Funciona de forma semelhante ao app, porém é carregado apenas uma única vez
// Por estar em um nível de renderização próximo ao HTML, não devemos passar muita coisa dentro do document, como por exemplo import de CSS
import Document, { Html, Head, Main, NextScript } from 'next/document';

// Escrevemos esse componente em formato de classe por conta do suporte do Next a ele ser escrito como função
export default class MyDocument extends Document {
  render() {
    return (
      // Abaixo faremos o retorno de algo similar ao index.html que tinhamos nos projetos com React, porém usando importações do Next
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main /> {/* Renderiza todo o conteúdo da aplicação */}
          <NextScript /> {/* Aonde o Next coloca todos os arquivos JS que a aplicação precisa pra funcionar */}
        </body>
      </Html>
    )
  }
}
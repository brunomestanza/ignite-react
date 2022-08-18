# Tipos de teste
Temos o teste unitário, que é quando testamos o comportamento de um único componente, teste 

# Testes que podem ser feitos
## Teste de renderização - ActiveLink.test.tsx
Podemos testar se um componente reenderiza corretamente, para isso, passamos o componente dentro de uma função render, que vai "renderiza-lo" apenas para testes, e com o restulrado que o render retorna, podemos pegar um debug que mostra exatamente oque é renderizado como HTML.
Podemos também realizar o teste, pegando o elemento HTML que usaremos como base, utilizando o getByText, e assim fazermos testes como toBeInTheDocument ou toHaveClass.

# Mock condicional - SignInButton.test.tsx
Podemos fazer também o mock de dados condicionalmente, usando o método mocked do jest, isso permite que possamos testar comportamentos de logado e deslogado por exemplo.

# Funcionalidades importantes
- Fire Event: Pode ser utilizado para disparar eventos feitos no cliente, como clique.
- findByText: Funciona da mesma forma que o getByText, porém de forma assíncrona.
- not: Podemos usar o not para fazermos negação dentro do código.
- screen.logTestingPlaygroundURL: Gera uma URL no console pra conseguir debugar e encontrar os elementos em tela.
- Coverage report: cobertura dos testes, desde suficiencia e as partes que ele cobre. Pra isso podemos adicionar configurações no jest.config.js, como collectCoverage, e da onde fazemos a coleta, entre outros. Isso gera um relátorio que mostra oque ele cobre e deixa de cobrar nos testes.

# Observações
1. Caso for ser feito o teste de uma promise, é importante que essa promise tenha seu teste com async await também. Além disso, o mocked deve ser feito com a função mockResolvedValueOnce.
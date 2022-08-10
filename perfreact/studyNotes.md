# Renderização
Componentes no React são reenderizados em 3 situações:
1. Quando o componente pai é alterado
2. Quando ele possui uma prop alterada
3. Quando um hook possui seu valor alterado (useState, useContext e afins)

Quando algum dos 3 cenários ocorrem, acontecem as seguintes coisas
1. O React cria uma nova versão do componente
2. Ele compara essa versão com a versão anterior
3. Se houverem alterações, atualiza o que alterou

# Memo - Exemplo de uso no ProductItem.tsx
O memo faz com que caso o componente seja igual a versão anterior quando ocorrer uma renderização, ele não seja duplicado, por não ter mudado nada
Essa verificação é chamada de shallow compare, ou comparação rasa, ele verifica a igualdade das informações dentro das props
Como quando comparamos 2 objetos em JS ele vai sempre retornar false, já que ele não analisa o conteúdo e sim a referência na memória, não podemos fazer
algo como {} === {}, sendo assim, podemos passar para o memo como segundo parâmetro, oque ele deve levar em conta para considerar a igualdade

## Situações de uso do memo
1. Em Pure Functional Components, que são apenas para abstrair uma parte visual da aplicação, devido a interface e não responsabilidade, são componentes
que não vão ter informações variáveis, e sim valores fixos
2. Renders to often, reenderizações em excesso, que podemos verificar juntamente com o React Dev Tools
3. Re-render with same props, reenderiza porém mantendo as mesmas props
4. Medium to big size, quando os components são muito grandes, já que as vezes as comparações do React vão ter menos custo do que as do memo

# useMemo - Exemplo de uso no SearchResults.tsx
Possui uma única funcionalidade, que é a de evitar renderizações de componentes, já que em uma atualização de estado por exemplo a página inteira renderiza e roda as funções novamentes.
Ele recebe dois parâmetros de forma similar ao useEffect, o primeiro sendo uma função a ser executada que DEVE ser retornada, e a outra um array de dependencias. Sendo assim, podemos usar o useMemo para cáculos pesados, como por exemplo de vários produtos que vem de uma API, e pra igualdade referêncial, que é quando passamos uma prop a um componente filho e ele cria outro espaço na memória.

# useCallback - Exemplo de uso no SearchResults.tsx
Possui a mesma funcionalidade do useMemo, mas para funções. É utilizado para que não criemos outra função quando o componente for renderizado, poupando de problemas como igualdade referêncial, ou seja, ele vai evitar que as funções sejam criadas mais de uma vez.

# Code splitting (Dividindo o código) - Exemplo no ProductItem.tsx
É carregar algo que vai ser utilizado apenas quando for utilizado, oque dá uma diferença muito grande no bundle da aplicação, que é feita quando buildamos o projeto. O bundle é criado para termos todo o app em um único arquivo. O bundle então, possui todo o código necessário para que a aplicação possa rodar. Dentro do next fazemos isso com o método dynamic, através do React, usamos o lazy. O dynamic pode receber 2 params, o primeiro da função que é utilizada para a importação de forma dinâmica, ou seja, apenas quando o componente é carregado, e a segunda é um loading para a aplicação enquanto ele não é carregado. Podemos fazer isso em imports de funções como date-fns e afins.

# Virtualização
Permite que renderizemos apenas alguns itens pro usuário ver em tela, pra não termos todo o conteúdo renderizado de uma vez.

# Bundle Analyzer - Exemplo no next.config.js
Analisa como está o bundle gerado após o build da aplicação. Geralmente é por conta de depêndecias pesadas ou com importações desnecessárias. Podemos usar como base para isso a depêndencia next bundle analyzer. No caso do windows precisamos fazer alterações no package.json pra essa analise.
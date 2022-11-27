# O uso do TSUP

Usamos o TSUP pra fazer a conversão do TS pra JS, não fazemos isso com o próprio TS porque o TSUP consegue converter o código pra formatos diferentes, comum JS e ECMAScript modules por exemplo, no caso do TSC, a gente acaba limitando quem pode usar o pacote em si. Também é possível fazer todos os arquivos de definição de tipagem, é possível fazer watch, e também o TSUP é muito mais performático. No final ele vai gerar dentro do dist, ele vai minificar todos os arquivos dentro de um único arquivo, além disso, ele gera um arquivo .mjs, do ESM, e um JS do CJS, juntamente com a definição de tipagem.

# Conceito de monorepo
É a prática de colocarmos vários projetos dentro de um único workspace, a questão de usar monorepo, é de os projetos dependerem uns dos outros. Por exemplo, caso eu tenha 2 projetos, e eles tiverem depêndencia entre si, seja ela qual for, eu tenho que ficar subindo o projeto no NPM toda hora, e atualizando no outro projeto, sendo monorepo isso não é necessário. Cada um dos projetos tem o seu package.json mas além disso temos um package.json global pra todos os projetos dentro do monorepo.

## Configs do package.json global
- Private = true: indica que o pacote não vai ser publicado no NPM, queremos apenas alguns repos internos sejam publicados.
- Workspaces: Um array que possui todos os pacotes que compõem o monorepo.

### Importante lembrar que:
- Além disso, dentro do projeto react, colocamos "@ignite-ui/tokens": "*", no package.json, oque faz com que o pacote de tokens seja uma dependência dentro do pacote react, porém, uma dependência local dentro do monorepo.
- Remover os package-lock.json dos repos internos, e instalar a node_modules no projeto base.
- Pra podermos importar algo de um projeto no outro, precisamos alterar o caminho do main dentro do package.json do projeto que vai ser a dependência pro arquivo index dentro da pasta dist.
- É necessário colocarmos o module, pra especificar o arquivo main do ESM pra caso vá ser utilizado.
- Usamos o types para colocarmos a tipagem automática pra ser utilizada no projeto.
- Instalar depêndencias em desenvolvimento sempre que essa dependência for obrigatória para a pessoa que for usar a lib, como por exemplo o React. Isso é feito porque a gente espera que o usuário tenha instalado na aplicação a lib em si, não colocamos o React juntamente com a lib, pra pouparmos espaço que ela ocupa, além de não gerar duplicação. É importante colocar --external react no sript do tsup, porque quando a build for feita a lib não vai ser importada da nossa lib,e sim da lib de quem vai codar o projeto.
- Instalar em produção libs que a pessoa que for codar o projeto não precise ter instalada pra consumir por padrão o projeto, como por exemplo o stitches.

# Vantagens no uso de monorepo
- Todas as dependências dos pacotes são usadas de forma global. Isso faz com que pacotes comuns não sejam instalados duas vezes.
- O pacote react, não possui localmente a instalação dos repos internos duas vezes. É feito através de um simbolic link, uma referência entre eles, pra que assim a dependência esteja sempre atualizada, e também não ocupe espaço desnecessariamente.

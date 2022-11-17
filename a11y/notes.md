# Elementos HTML e Landmarks
Elementos HTML possuem funcionalidade, landmarks, possuem valor semântico. Não é legal ter duas tags HTML com o mesmo valor semântico dentro da aplicação.
Por exemplo, se temos 2 sessões de navegação com a tag HTML nav, ambas terão por padrão a landmark de navigation, porém, uma delas, possui a função de ser uma navegação principal e a outra deve ser complementar, ou algo assim. Pra isso, podemos utilizar o aria-label por exemplo pra diferenciar os 2. Isso é utilizado MUITO em acessibilidade, para que os conteúdos possam ser diferenciados.

# Pontos importantes
1. Nunca colocar "Logo do site X" e afins, porque o leitor de tela já le isso como sendo uma imagem, então a informação fica redundante.
2. Podemos usar aria-labels, para adicionar comportamento a mais a aplicação dentro do HTML. São basicamente várias roles que podem adicionar comportamento ao HTML da nossa página. Assim, leitores de tela e afins conseguem distinguir melhor oque é o elemento HTML que está em tela. Temos como alternativa a isso também, usar um <title> dentro da tag HTML como primeiro componente filho como por exemplo em SVGs.
3. Os leitores de tela SEMPRE leem a tag para o usuário, então é bom colocar coisas em aria-labels, como "Acessar link tal" em links, "Blog do site X" e imagens de logo em blogs e assim por diante.
4. Não ter redundância em texto alternativos de imagem com textos de conteúdo. Por exemplo, se temos um link com aria-label, "Acessar Github", não devemos ter como conteúdo filho desse link, um texto "Acessar Github" também, isso gera rendundância. É possível colocar o texto alternativo como vazio.
5. Caso não seja possível descrever algo, deixar o alt vazio.
6. Áudios não tem alt.
7. Toda página deve ter ao menos um h1.
8. Os headings devem ter uma hierarquia lógica.

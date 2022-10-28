/* eslint-disable prettier/prettier */
import { Coffee } from '../@types/coffee'

export function coffeesListGenerator() {
  return [
    {
      name: 'Expresso Tradicional',
      description: 'O tradicional café feito com água quente e grãos moídos',
      tags: ['Tradicional'],
      price: 9.90,
      imgUrl: './coffees/expresso-tradicional.png',
    },
    {
      name: 'Expresso Americano',
      description: 'Expresso diluído, menos intenso que o tradicional',
      tags: ['Tradicional'],
      price: 9.90,
      imgUrl: './coffees/expresso-americano.png',
    },
    {
      name: 'Expresso Cremoso',
      description: 'Café expresso tradicional com espuma cremosa',
      tags: ['Tradicional'],
      price: 9.90,
      imgUrl: './coffees/expresso-cremoso.png',
    },
    {
      name: 'Expresso Gelado',
      description: 'Bebida preparada com café expresso e cubos de gelo',
      tags: ['Tradicional', 'Gelado'],
      price: 9.90,
      imgUrl: './coffees/expresso-gelado.png',
    },
    {
      name: 'Café com Leite',
      description: 'Meio a meio de expresso tradicional com leite vaporizado',
      tags: ['Tradicional', 'Com leite'],
      price: 9.90,
      imgUrl: './coffees/cafe-com-leite.png',
    },
    {
      name: 'Latte',
      description:
        'Uma dose de café expresso com o dobro de leite e espuma cremosa',
      tags: ['Tradicional', 'Com leite'],
      price: 9.90,
      imgUrl: './coffees/latte.png',
    },
    {
      name: 'Capuccino',
      description:
        'Bebida com canela feita de doses iguais de café, leite e espuma',
      tags: ['Tradicional', 'Com leite'],
      price: 9.90,
      imgUrl: './coffees/capuccino.png',
    },
    {
      name: 'Macchiato',
      description:
        'Café expresso misturado com um pouco de leite quente e espuma',
      tags: ['Tradicional', 'Com leite'],
      price: 9.90,
      imgUrl: './coffees/macchiato.png',
    },
    {
      name: 'Mocaccino',
      description: 'Café expresso com calda de chocolate, pouco leite e espuma',
      tags: ['Tradicional', 'Com leite'],
      price: 9.90,
      imgUrl: './coffees/mocaccino.png',
    },
    {
      name: 'Chocolate Quente',
      description:
        'Bebida feita com chocolate dissolvido no leite quente e café',
      tags: ['Especial', 'Com leite'],
      price: 9.90,
      imgUrl: './coffees/chocolate-quente.png',
    },
    {
      name: 'Cubano',
      description:
        'Drink gelado de café expresso com rum, creme de leite e hortelã',
      tags: ['Especial', 'Alcoólico', 'Gelado'],
      price: 9.90,
      imgUrl: './coffees/cubano.png',
    },
    {
      name: 'Havaiano',
      description: 'Bebida adocicada preparada com café e leite de coco',
      tags: ['Especial'],
      price: 9.90,
      imgUrl: './coffees/havaiano.png',
    },
    {
      name: 'Árabe',
      description: 'Bebida preparada com grãos de café árabe e especiarias',
      tags: ['Especial'],
      price: 9.90,
      imgUrl: './coffees/arabe.png',
    },
    {
      name: 'Irlandês',
      description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
      tags: ['Especial', 'Alcoólico'],
      price: 9.90,
      imgUrl: './coffees/irlandes.png',
    },
  ] as Coffee[]
}

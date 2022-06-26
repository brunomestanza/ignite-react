// Esse componente é um link do Next com estilização, que é utilizado no Header. Ele é colocado aqui por ser utilizado multiplas vezes na aplicação
// e alem disso, ele recebe sempre a página atual da aplicação, então assim caso adicionemos uma página nova, não precisamos recriar a lógica pra ela
import { ReactElement, cloneElement } from 'react';
import Link, { LinkProps } from "next/link";
import { useRouter } from 'next/router';

// Recebemos todas as props que o Link pode receber além da children e da className
interface ActiveLinkProps extends LinkProps{
  // O parâmetro recebido no caso é a tag ancora em si
  children: ReactElement;
  activeClassName: string;
}

// Pegamos as props que foram extendidas do Link e colocamos dentro do rest, que são passadas para dentro do Link em si
// Isso faz com que caso esse componente receba algum dos parâmetros que o Link pode receber, como prefetch, a lógica não precise de alteração
export function ActiveLink({ children, activeClassName, ...rest}: ActiveLinkProps) {
  // O useRouter é um hook do Next, que é utilizado para passar informações da rota atual da aplicação, como o asPath, que é a rota acessada atualmente
  const { asPath } = useRouter();
  const className = asPath === rest.href ? activeClassName : '';

  return (
    <Link {...rest}>
      {/* Tag ancora em si */}
      {/* Utilizamos o cloneElement para clonarmos o elemento children, a tag ancora, e adicionarmos dentro dessa tag a className, isso porque */}
      {/* normalmente não podemos passar nada como parâmetro para um children dentro do React */}
      {cloneElement(children, {
        className,
      })}
    </Link>
  )
}
import { Timer, Scroll } from 'phosphor-react'
import { HeaderContainer } from './styles'
import logoIgnite from '../../assets/logo-ignite.svg'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      {/* Quando não é possível descrever exatamente oque é a imagem, ou o conteúdo, é melhor deixar o texto alternativo em branco para que o leitor de tela não o leia */}
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}

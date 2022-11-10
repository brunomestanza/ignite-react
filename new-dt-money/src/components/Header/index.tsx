import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'
import logoImg from '../../assets/logo.svg'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root>
          {/* O asChild faz com que o dialog.trigger aproveite o botão ao invés de criar outro por padrão */}
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          {/* O portal faz com que o conteúdo do modal não fique no contexto da aplicação, inclusive fora da div root do HTML */}
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}

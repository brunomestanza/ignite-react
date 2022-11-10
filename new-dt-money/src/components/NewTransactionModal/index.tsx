import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import {
  Content,
  Overlay,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from './styles'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  // A diferença em usar o useContextSelector, é que ele faz com que não sejam feitas renderizações desnecessárias, já que passamos exatamente oque o react
  // deve monitorar para fazer uma renderização caso seja alterado, que é basicamente tudo do contexto que nos utilizamos, no caso aqui apenas a função de
  // createTransaction é usada, e então é a única a ser monitorada
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    // Usamos uma função dentro do contexto para fazer a request, porque desta maneira, ao invés de ter que fazer 2 requests, uma post pra adicionar a nova
    // transaction e outra get pra pegar o array de transactions atualizado, eu faço apenas uma request, e atualizo o estado. Para não expor o método para
    // atualizar o estado de transactions, é preferível expor apenas a função de criação, que faz a request, e já adiciona o novo valor no estado.
    // Fazemos dessa forma, porque ao expor a lógica pra atualizar, vários componentes poderiam fazer isso de formas diferentes.
    createTransaction(data)

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          {/* Usamos o control para adicionar comportamento de formulário a input personalizado, que não é nativo do HTML, para recuperar e alterar o valor
          No name passamos o nome do valor do schema que vai ser utilizado
          Por último temos o render que retorna o conteúdo relacionado ao type */}
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                // Usamos a função onValueChange do radix, pra que quando um dos radio buttons for clicado, alteremos o valor do formulário com a função onchange
                // do react hook form
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton value="income" variant="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton value="outcome" variant="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}

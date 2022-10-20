// O projeto não utiliza a validação do zod por falta de necessidade, mas tem o exemplo de como pode ser feita. A validação do HTML em si já é suficiente.

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HandPalm, Play } from 'phosphor-react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

// Podemos fazer inferência de tipagem com o zod
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // Usamos o typeof para a referência de uma variável JS no TS

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CyclesContext)

  // O register recebe o nome do input, e retorna métodos usados para lidarmos com os inputs através do react-hook-form, como onChange e onFocus
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const task = watch('task') // Podemos usar o watch para termos um ou mais campos como controlled components. Isso causa renderização
  const isSubmitDisabled = !task

  // Usamos essa função para não passar o reset para o context, já que ele não faz parte dele
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset() // Reseta os valores para o valor declarado no defaultValues dentro do useForm
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        {/* Provider para o useForm do react-hook-form */}
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}

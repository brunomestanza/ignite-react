import { v4 as uuidv4 } from 'uuid'
import { useTheme } from 'styled-components'
import { Benefits } from './Benefits'
import { CoffeeCard } from './CoffeeCard'
import { coffeesListGenerator } from '../../utils/coffeesListGenerator'
import {
  BenefitsContainer,
  HomeContainer,
  HomeContent,
  CoffeesSectionTitle,
  CoffeesSectionContainer,
  BackgroundImage,
} from './styles'

export function Home() {
  const theme = useTheme()
  const coffeeList = coffeesListGenerator()

  return (
    <>
      <HomeContainer>
        <HomeContent>
          <div>
            <h1>
              Encontre o café perfeito
              <br /> para qualquer hora do dia
            </h1>
            <p>
              Com o Coffee Delivery você recebe seu café onde estiver, a
              <br /> qualquer hora
            </p>
            <BenefitsContainer>
              <Benefits
                color={theme['color-styles'].brand['yellow-dark']}
                title="Compra simples e segura"
                variant="cart"
              />
              <Benefits
                color={theme['color-styles'].base.text}
                title="Embalagem mantém o café intacto"
                variant="package"
              />
              <Benefits
                color={theme['color-styles'].brand.yellow}
                title="Entrega rápida e rastreada"
                variant="timer"
              />
              <Benefits
                color={theme['color-styles'].brand.purple}
                title="O café chega fresquinho até você"
                variant="coffee"
              />
            </BenefitsContainer>
          </div>
          <img src="./coffee.png" alt="Café" />
        </HomeContent>
      </HomeContainer>
      <CoffeesSectionTitle>Nossos cafés</CoffeesSectionTitle>
      <CoffeesSectionContainer>
        {coffeeList.map((coffee) => {
          return (
            <CoffeeCard
              key={coffee.name}
              id={uuidv4()}
              description={coffee.description}
              name={coffee.name}
              tags={coffee.tags}
              price={coffee.price}
              imgUrl={coffee.imgUrl}
            />
          )
        })}
      </CoffeesSectionContainer>
      <BackgroundImage />
    </>
  )
}

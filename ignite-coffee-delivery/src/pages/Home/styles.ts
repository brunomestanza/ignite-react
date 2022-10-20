import styled from 'styled-components'

export const HomeContainer = styled.div`
  margin: 5.875rem 0;
  z-index: 1;
`
export const HomeContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 90rem;

  div {
    h1 {
      font: ${({ theme }) => theme['text-styles'].title.xl};
      color: ${({ theme }) => theme['color-styles'].base.title};
      margin-bottom: 1rem;
    }

    p {
      font: ${({ theme }) => theme['text-styles'].text['regular-l']};
      color: ${({ theme }) => theme['color-styles'].base.subtitle};
    }
  }
`

export const BenefitsContainer = styled.div`
  margin-top: 4.125rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`
export const CoffeesSectionTitle = styled.h3`
  font: ${({ theme }) => theme['text-styles'].title.l};
  color: ${({ theme }) => theme['color-styles'].base.subtitle};
  margin: 2rem 0 2.125rem 0;
`

export const CoffeesSectionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  margin-bottom: 9.375rem;
`

export const BackgroundImage = styled.div`
  background-image: url(./background.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  width: calc(100vw - 10rem);
  height: 31.15rem;
  left: 0;
  top: 6.25rem;
  filter: blur(90px);
`

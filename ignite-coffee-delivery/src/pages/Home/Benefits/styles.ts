import styled from 'styled-components'

interface BenefitsStylesProps {
  backgroundColor: string
}

export const BenefitsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const IconContainer = styled.div<BenefitsStylesProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  margin-right: 0.75rem;
`

export const Label = styled.span`
  color: ${({ theme }) => theme['color-styles'].base.text};
  font: ${({ theme }) => theme['text-styles'].text['regular-m']};
`

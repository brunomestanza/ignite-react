import styled from 'styled-components'

interface FinishedPurchaseStyles {
  backgroundColor: string
}

export const FinishedPurchaseContainer = styled.main`
  margin-top: 5rem;

  h2 {
    color: ${({ theme }) => theme['color-styles'].brand['yellow-dark']};
    font: ${({ theme }) => theme['text-styles'].title.l};
  }

  span {
    color: ${({ theme }) => theme['color-styles'].base.subtitle};
    font: ${({ theme }) => theme['text-styles'].text['regular-l']};
  }
`

export const ContentContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;
`

export const BorderContainer = styled.div`
  padding: 1px;
  background: linear-gradient(to right, #dbac2c, #8047f8);
  border-radius: 6px 36px;
`

export const PurchaseInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5rem;
  height: 100%;
  padding: 2.5rem;
  background: ${({ theme }) => theme['color-styles'].base.background};
  border-radius: inherit;
`

export const PurchaseItemContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    font: ${({ theme }) => theme['text-styles'].text['regular-m']};
  }

  strong {
    font: ${({ theme }) => theme['text-styles'].text['bold-m']};
  }
`

export const PurchaseIconContainer = styled.div<FinishedPurchaseStyles>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  margin-right: 0.75rem;
`

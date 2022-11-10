import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import {
  PriceHighlight,
  TransactionContainer,
  TransactionsTable,
} from './styles'

export function Transaction() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionContainer>
    </div>
  )
}

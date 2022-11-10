import { useEffect, useState, ReactNode, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface TransactionProviderProps {
  children: ReactNode
}

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  type: 'income' | 'outcome'
  category: string
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (quuery?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data
      const response = await api.post('/transactions', {
        // O json-server cria o id automaticamente
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    // Funciona de forma semelhante ao array de dependencias do useEffect, nesse caso a função nunca será recriada novamente em memória, apenas
    // da primeira vez que o componente renderizar. É importante lembrar que quaisquer informação, como por exemplo um estado, do qual essa função for
    // dependente, deve ser inforamdo junto no array, porque se não a função vai usar os valores antigos na sua execução
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

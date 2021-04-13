import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Transaction {
  amount: number
  category: string
  createdAt: string
  id: number
  title: string
  type: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[],
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions')
    .then(response =>setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transaction', {
      ...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data
    setTransactions([
      ...transactions,
      transaction,
    ])

  }

  return (
    <TransactionsContext.Provider value={{ createTransaction , transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransaction() {
  const context = useContext(TransactionsContext)
  return context
}
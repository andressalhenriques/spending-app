import { useTransaction } from '../../hooks/useTransactions';
import { Container } from "./styles";

export function TransactionTable(){
  const { transactions } = useTransaction()

  const timeZone = Intl.DateTimeFormat().resolvedOptions()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
            <td>{transaction.title}</td>
            <td className={transaction.type}>{
              new Intl.NumberFormat(timeZone.locale, {
                style: 'currency',
                currency: 'BRL'
              }).format(transaction.amount)}
            </td>
            <td>{transaction.category}</td>
            <td>
              {
                new Intl.DateTimeFormat(timeZone.locale).format(
                  new Date(transaction.createdAt)
                )
              }
            </td>
            </tr>
          ))}

        </tbody>
      </table>
    </Container>
  )
}
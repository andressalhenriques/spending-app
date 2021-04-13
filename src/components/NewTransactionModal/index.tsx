import { FormEvent, useState, useContext } from 'react'
import Modal from 'react-modal'

import { Container, RadioBox, TransactionTypeContainer } from './styles'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'
import { useTransaction } from '../../hooks/useTransactions'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose } : NewTransactionModalProps ) {
  const { createTransaction } = useTransaction()
  
  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()
    await createTransaction({
      amount,
      category,
      title,
      type,
    })
    onRequestClose()
    cleanData()
  }

  function cleanData() {
    setAmount(0)
    setCategory('')
    setTitle('')
    setType('deposit')
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="close modal"/>
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Add new transaction</h2>
        <input
          placeholder="Title"
          onChange={event => setTitle(event.target.value)}
          value={title}
        />
        <input
          placeholder="Amount" type="number"
          onChange={event => setAmount(Number(event.target.value))}
          value={amount}
        />

        <TransactionTypeContainer>
        <RadioBox 
          isActive={type === 'deposit'}
          ActiveColor="green"
          onClick={() => { setType('deposit') }}
          type="button"
        > 
          <img src={incomeImg} alt="income"/>
          <span>Income</span>
        </RadioBox>
        {console.log(type)}
        <RadioBox
          isActive={type === 'withdraw'}
          ActiveColor="red"
          onClick={() => { setType('withdraw') }}
          type="button"
        > 
          <img src={outcome} alt="outcome"/>
          <span>Outcome</span>
        </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="category"
          onChange={event => setCategory(event.target.value)}
          value={category}
        />
        <button type="submit"> Add</button>
      </Container>
  </Modal>
  )
}
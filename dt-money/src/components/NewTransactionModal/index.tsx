import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('deposit');
  
  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({
      title,
      category,
      amount,
      transactionType,
    });
    setTitle('');
    setAmount(0);
    setCategory('');
    setTransactionType('deposit');
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        className="react-modal-close"
        type="button"
        onClick={onRequestClose}
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}> 
        <h2>Cadastrar transação</h2>
        <input
          onChange={event => setTitle(event.target.value)}
          placeholder="Título"
          type="text"
        />
        <input
          onChange={event => setAmount(Number(event.target.value))}
          placeholder="Valor"
          type="number"
        />
        <TransactionTypeContainer>
          <RadioBox
            activeColor="green"
            isActive={transactionType === 'deposit'}
            onClick={() => setTransactionType("deposit")}
            type="button"
            >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            activeColor="red"
            isActive={transactionType === 'withdraw'}
            onClick={() => setTransactionType("withdraw")}
            type="button"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          onChange={event => setCategory(event.target.value)}
          placeholder="Categoria"
          type="Compras"
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}

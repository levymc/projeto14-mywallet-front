import styled from "styled-components"
import { useLocation, useParams } from "react-router-dom";

export default function TransactionsPage() {
  console.log(1)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { tipo } = useParams();
  console.log(tipo)

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form>
        <input data-test="registry-amount-input" placeholder="Valor" type="text"/>
        <input data-test="registry-name-input" placeholder="Descrição" type="text" />
        <button data-test="registry-save">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`

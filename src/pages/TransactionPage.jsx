import styled from "styled-components"
import { useLocation, useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TransactionsPage() {
  const { tipo } = useParams();

  const navigateTo = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        senha: "",
    });

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

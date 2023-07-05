import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";

export default function SignInPage() {
  // Função para manipular o envio do formulário
  const handleRequest = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    const email = event.target.elements.email.value; // Obtém o valor do campo de e-mail
    const senha = event.target.elements.senha.value; // Obtém o valor do campo de senha

    try {
      // Realiza a requisição POST para a rota "/login" utilizando o axios
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        senha: senha,
      });
      console.log(response.data); // Exibe a resposta do servidor no console
    } catch (error) {
      console.error(error); // Exibe o erro no console, caso ocorra algum problema na requisição
    }
  };

  return (
    <SingInContainer>
      <form onSubmit={handleRequest}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" name="email" />
        <input
          placeholder="Senha"
          type="password"
          name="senha"
          autoComplete="new-password"
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;




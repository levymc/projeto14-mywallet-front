import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { useState } from "react";
import handleInputChange from "../components/handleInputChange";

export default function SignInPage() {
    const navigateTo = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        senha: "",
    });

    const handleRequest = async (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const senha = event.target.elements.senha.value;
        console.log(email, senha);
        try {
        await axios.post(import.meta.env.VITE_API_URL + "/login", {
            email: email,
            senha: senha,
            })
            .then((res) => {
            localStorage.setItem('userData', JSON.stringify(res.data));
            navigateTo('/home');
            });
        } catch (error) {
        alert(error.response.data);
        console.error(error.response.data);
        }
    };

  return (
    <SingInContainer>
      <form onSubmit={handleRequest}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          data-test="email"
          type="email"
          name="email"
          onChange={(e) => handleInputChange(e, setFormData)}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          name="senha"
          autoComplete="new-password"
          data-test="password"
          onChange={(e) => handleInputChange(e, setFormData)}
          required
        />
        <button data-test="sign-in-submit" type="submit">
          Entrar
        </button>
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

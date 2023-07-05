import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { useState } from "react";
import handleInputChange from "../components/handleInputChange";

export default function SignInPage() {
    const [formData, setFormData] = useState({
        email: "",
        senha: "",
    });


    const handleRequest = async (event) => {
        event.preventDefault(); 
        const email = event.target.elements.email.value;
        const senha = event.target.elements.senha.value;
        try {
        const response = await axios.post("http://localhost:5000/login", {
            email: email,
            senha: senha,
        });
        console.log(response.data);
        } catch (error) {
        console.error(error);
        }
  };

  return (
    <SingInContainer>
        <form onSubmit={handleRequest}>
            <MyWalletLogo />
            <input placeholder="E-mail" type="email" name="email" onChange={e => handleInputChange(e, setFormData)}/>
            <input
            placeholder="Senha"
            type="password"
            name="senha"
            autoComplete="new-password"
            onChange={e => handleInputChange(e, setFormData)}
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




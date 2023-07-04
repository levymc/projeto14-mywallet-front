import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import Swal from 'sweetalert2'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha === formData.confirmarSenha) {
      axios.post("http://localhost:5000/cadastro", formData).then((response) => {
            console.log(response.data); 
            Swal.fire({
              title:"Usuário cadastrado com sucesso!",
              icon: "success"
            })
        }).catch((error) => {
            alert(error.response.data);
            console.error("Erro ao cadastrar:", error.response.data);
        });
    }else{
      alert("A senha confirmada não é igual.")
    }
  };

  return (
    <SignUpContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
        />
        <input
          placeholder="E-mail"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          name="senha"
          value={formData.senha}
          onChange={handleInputChange}
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          name="confirmarSenha"
          value={formData.confirmarSenha}
          onChange={handleInputChange}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/login">Já tem uma conta? Entre agora!</Link>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

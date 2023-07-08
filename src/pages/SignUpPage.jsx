import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import Swal from 'sweetalert2'
import handleInputChange from "../components/handleInputChange";

export default function SignUpPage() {
    const navigateTo = useNavigate()

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if (formData.senha === formData.confirmarSenha) {
            try{
                await axios.post(import.meta.env.VITE_API_URL_DEV + "/cadastro", formData).then((response) => {
                    console.log(response.data); 
                    Swal.fire({
                        title:"Usuário cadastrado com sucesso!",
                        icon: "success"
                    }).then(() => navigateTo('/'))
                })
            }catch(error){
                alert(error.response.data);
                console.error("Erro ao cadastrar:", error.response.data);
            };
            
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
                data-test="name"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={e => handleInputChange(e, setFormData)}
            />
            <input
                placeholder="E-mail"
                data-test="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={e => handleInputChange(e, setFormData)}
            />
            <input
                placeholder="Senha"
                data-test="password"
                type="password"
                autoComplete="new-password"
                name="senha"
                value={formData.senha}
                onChange={e => handleInputChange(e, setFormData)}
            />
            <input
                placeholder="Confirme a senha"
                data-test="conf-password"
                type="password"
                autoComplete="new-password"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={e => handleInputChange(e, setFormData)}
            />
            <button data-test="sign-up-submit" type="submit">Cadastrar</button>
        </form>

        <Link to="/">Já tem uma conta? Entre agora!</Link>
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

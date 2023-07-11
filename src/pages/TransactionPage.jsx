import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


export default function TransactionsPage() {
    const navigateTo = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    useEffect(() => {
        if (userData === null) {
            navigateTo('/');
        }
    }, []);

    if (userData != null){
        const { tipo } = useParams();
        const [formData, setFormData] = useState({
            valor: "",
            descricao: "",
            type: tipo
        });

        const handleChange = (event) => {
            const { name, value } = event.target;
            setFormData((prevState) => ({
            ...prevState,
            [name]: value
            }));
        }


        const handleSubmit = (event) => {
            event.preventDefault();
            const formattedValue = parseFloat(formData.valor).toFixed(2);
            const formattedData = {
                ...formData,
                valor: formattedValue
            };
            const url = import.meta.env.VITE_API_URL + "/transactions";
            const token = {
            headers: {
                Authorization: `Bearer ${userData.token}`,
                id: userData.userId
            }
            };

            axios.post(url, formattedData, token).then((response) => {
                console.log(response.data);
                navigateTo("/home");
            })
            .catch((error) => {
                alert(error.response.data);
                console.error(error.response.data);
            });
        };

        return (
            <TransactionsContainer>
                <h1>Nova {tipo}</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        data-test="registry-amount-input"
                        placeholder="Valor"
                        type="number"
                        name="valor"
                        step="0.01"
                        value={formData.valor}
                        onChange={handleChange}
                    />
                    <input
                        data-test="registry-name-input"
                        placeholder="Descrição"
                        type="text"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                    />
                    <button data-test="registry-save" type="submit">
                    Salvar TRANSAÇÃO
                    </button>
                </form>
            </TransactionsContainer>
        );
    }
    
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
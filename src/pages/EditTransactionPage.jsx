import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


export default function TransactionsPage() {
    console.log("AQYUIIIS")
    const navigateTo = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    useEffect(() => {
        if (userData === null) {
            navigateTo('/');
        }
    }, []);

    if (userData != null){
        const { tipo ,id } = useParams();
        const [formData, setFormData] = useState({
            valor: "",
            descricao: "",
        });

        const handleChange = (event) => {
            const { name, value } = event.target;
            setFormData((prevState) => ({
            ...prevState,
            [name]: value
            }));
        }

        const getTransactionsById = () => {
            const config = {
                headers: {
                Authorization: `Bearer ${userData.token}`,
                id: id,
                },
            };
            axios.get(import.meta.env.VITE_API_URL + "/transactionsById", config).then(res => {
                console.log(res.data)
                const data = {
                    valor: res.data.valor,
                    descricao: res.data.descricao
                }
                setFormData(data)
            }).catch(err => {
                console.log(err.response.data)
            })
            // try {
                
            //     if (response.data.length === 0) {
            //         transactionsData = [];
            //         total = 0;
            //     } else {
            //         total = response.data.totalTransac.length === 0 ? 0 : response.data.totalTransac[0].total.toFixed(2);
            //         // setTransactions(response.data.data.reverse());
            //         console.log(total);
            //         // setTotalTransac(total);
            // }
            // } catch (error) {
            //     console.error(error);
            // }
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            const formattedValue = parseFloat(formData.valor).toFixed(2);
            const formattedData = {
                ...formData,
                valor: formattedValue
            };

            axios.put(import.meta.env.VITE_API_URL + `/editar-registro/`, {data: {id: id}}).then(res => {
                console.log(res);
            }).catch(err => {
                console.log("AUi");
                console.log(err.response);
            });
        };


        useEffect(() => {
            getTransactionsById();
        }, []);

        return (
            <TransactionsContainer>
                <h1>Editar {tipo}</h1>
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
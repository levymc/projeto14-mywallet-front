import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
    const [transactions, setTransactions] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [totalTransac, setTotalTransac] = useState(0);

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                        id: userData.userId
                    },
                };
        
                const response = await axios.get(import.meta.env.VITE_API_URL + "/transactions", config);

                const transactionsData = response.data.data;
                const total = response.data.totalTransac[0].total.toFixed(2);
                // console.log(22222, total)
                setTransactions(transactionsData);
                setTotalTransac(total)
            } catch (error) {
                console.error(error);
            }
        };
        console.log(transactions)
        getTransactions();
        }, []);

        const handleQuit = async (e) => {
            e.preventDefault()
            try{
                const deleted = await axios.delete('/sessao', {token: userData.token})
            }catch(err){
                console.log(err)
            }
        }
        
    return (
        <HomeContainer>
        <Header>
            <h1 data-test="user-name">Olá, {userData.nome}</h1>
            <BiExit className="pointer" data-test="logout" />
        </Header>

        <TransactionsContainer>
            <ul>
            {transactions.map((transaction) => (
                <ListItemContainer key={transaction._id}>
                <div>
                    <span>{transaction.data}</span>
                    <strong data-test="registry-name">{transaction.descricao}</strong>
                </div>
                <Value
                    data-test="registry-amount"
                    color={transaction.type === "saida" ? "negativo" : "positivo"}
                >
                    {transaction.valor}
                </Value>
                </ListItemContainer>
            ))}
            </ul>

            <article>
            <strong>Saldo</strong>
            <Value data-test="total-amount" color={ totalTransac >= 0 ? "positivo" : "negativo" }>
                R$ {totalTransac}
            </Value>
            </article>
        </TransactionsContainer>

        <ButtonsContainer>
            <Link to="/nova-transacao/entrada">
            <button data-test="new-income">
                <AiOutlinePlusCircle />
                <p>Nova <br /> entrada</p>
            </button>
            </Link>
            <Link to="/nova-transacao/saida">
            <button data-test="new-expense">
                <AiOutlineMinusCircle />
                <p>Nova <br /> saída</p>
            </button>
            </Link>
        </ButtonsContainer>
        </HomeContainer>
    );
}


const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
`
const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2px 5px 2px;
    margin-bottom: 15px;
    font-size: 26px;
    color: white;
`
const TransactionsContainer = styled.article`
    flex-grow: 1;
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    article {
        display: flex;
        justify-content: space-between;   
        strong {
        font-weight: 700;
        text-transform: uppercase;
        }
    }
`
const ButtonsContainer = styled.section`
    margin-top: 15px;
    margin-bottom: 0;
    display: flex;
    gap: 15px;
    
    Link button {
        width: 50%;
        height: 115px;
        font-size: 22px;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
        font-size: 18px;
        }
    }
`
const Value = styled.div`
    font-size: 16px;
    text-align: right;
    color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    color: #000000;
    margin-right: 10px;
    div span {
        color: #c6c6c6;
        margin-right: 10px;
    }
`
import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { List } from "../../context";
import axios from "axios";
import "./styles.css"

export default function ListaAtividade() {
  const [activityName, setActivityName] = useState("");
  const { list, setList } = useContext(List);

  function AddAtividade(e) {
    e.preventDefault();
    setList([...list, activityName]);
  }
  async function Data() {
    await axios("http://localhost:4003/findAtividade", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        setList(response.data);
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  };
  async function NewData(nome) {
    await axios("http://localhost:4003/createAtividade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {nome: nome}
    })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        Data()
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  };
 
  

  return (
    <div className="container">
      <h1>Crie uma Atividade</h1>
      <input
      className="texto"
        type="text"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
      />
      <button onClick={() => NewData(activityName)}>Adicionar atividade</button>
      <Link className="link"
       to="/view">Ver listas</Link>

       <button onClick={Data} > CARREGAR DADOS </button>
    </div>
  );
}

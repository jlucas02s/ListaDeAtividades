import React, { useContext, useState } from "react";
import { List } from "../../context";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import "./styles.css";

export default function ListaAtividade() {
  const [activityName, setActivityName] = useState("");
  const [activityPreco, setActivityPreco] = useState("");
  const { list, setList } = useContext(List);
  const navigate = useNavigate();



  function redirectToView() {
    navigate("/view");
  }
  async function Data() {
    await axios
      .get("http://localhost:4003/findAtividade", {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        setList(response.data);
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  }

  async function NewData() {
    await axios
      .post("http://localhost:4003/createAtividade", {
        nome: activityName,
        preco: activityPreco,
      })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        Data();
        setActivityName("");
        setActivityPreco("");
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  }

  async function handleDados ()
{
Data()
redirectToView()
}
  return (

<div className="container">
  <h1 className="title">Cadastre um produto</h1>
  <form className="form">
    <div className="input-wrapper">
      <input
        className="input"
        type="text"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        placeholder="Nome do produto"
      />
      <input
        className="input"
        type="number"
        value={activityPreco}
        onChange={(e) => setActivityPreco(e.target.value)}
        placeholder="Preço R$"
      />
    </div>
    <button className="button" onClick={NewData}>
      Adicionar produto
    </button>
  </form>
  <button className="button" onClick={handleDados}>
        Ver listas
      </button>
  
</div>

    
    // <div className="container">
    //   <h1>Cadastre um produto</h1>
    //   <input
    //     className="texto"
    //     type="text"
    //     value={activityName}
    //     onChange={(e) => setActivityName(e.target.value)}
    //     placeholder="Nome do produto"
    //   />
    //   <input
    //     className="preço"
    //     type="number"
    //     value={activityPreco}
    //     onChange={(e) => setActivityPreco(e.target.value)}
    //     placeholder="Preço do produto"
    //   />
    //   <button onClick={NewData}>Adicionar produto</button>
    //   <Link className="link" to="/view">
    //     Ver listas
    //   </Link>

    //   <button onClick={Data}>CARREGAR DADOS</button>
    // </div>
  );
}

import React, { useContext, useState, useEffect } from "react";
import { List } from "../../context";
import axios from "axios";
import Select from "react-select";

export default function ListCreate() {
  const { list, setList } = useContext(List);
  const [activity, setActivity] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function fetchProducts(query) {
    await axios.get("http://localhost:4003/findAtividade", {
      params: { query },
    })
      .then((response) => {
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  }

  useEffect(() => {
    Data();
  }, []);

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
  }

  async function Delete(id) {
    await axios("http://localhost:4003/deleteAtividade", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      data: { id: id },
    })
      .then((response) => {
        console.log("Sucesso em fetch categoria!", response.data);
        Data();
      })
      .catch((error) => {
        console.log("Erro em fetch categoria!", error);
      });
  }

  function handleProductChange(selectedOption) {
    setActivity(selectedOption);
  }

  function handleProductSearch(query) {
    setActivity(query);
    fetchProducts(query);
  }

  return (
<div className="view">
  <h1 className="title">PRODUTOS</h1>
  <Select
    className="select"
    options={filteredProducts}
    value={activity}
    onChange={handleProductChange}
    onInputChange={handleProductSearch}
    getOptionLabel={(option) => option.nome}
    getOptionValue={(option) => option.preco}
    placeholder="Digite o nome do produto"
    isClearable
    isLoading={!filteredProducts}
  />
  <table className="product-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Preço</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {list.map((activity) => (
        <tr key={activity.id}>
          <td>{activity.nome}</td>
          <td>{activity.preco}</td>
          <td>
            <button onClick={() => Delete(activity.id)}>Remover</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



    // <div className="view">
    //   <h1>PRODUTOS</h1>
    //   <Select
    //     options={filteredProducts}
    //     value={activity}
    //     onChange={handleProductChange}
    //     onInputChange={handleProductSearch}
    //     getOptionLabel={(option) => option.nome}
    //     getOptionValue={(option) => option.preco}
    //     placeholder="Digite o nome do produto"
    //     isClearable
    //     isLoading={!filteredProducts}
    //   />
    //   <ul>
    //     {list.map((activity) => (
    //       <div key={activity.id}>
    //         <li>{activity.nome}</li>
    //         <li>{activity.preco}</li>
    //         <button onClick={() => Delete(activity.id)}>Remover</button>
    //       </div>
    //     ))}
    //   </ul>
    // </div>
  );
}

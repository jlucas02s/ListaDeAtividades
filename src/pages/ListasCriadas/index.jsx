import React, { useContext, useState } from "react";
import { List } from "../../context";

export default function ListCreate() {
  const { list, setList } = useContext(List);

  return (
    <div className="view">
      <h1>Atividades</h1>
      <ul>
        {list.map((activity) => (
          <li key={activity.id}>{activity.nome}</li>
        ))}
      </ul>
    </div>
  );
}

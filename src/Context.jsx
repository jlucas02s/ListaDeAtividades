import React, { createContext, useState } from "react";

const List = createContext();

const ContextProvider = ({children}) => {
  const [list, setList] = useState([]);
  return (
  <List.Provider value={{ list, setList }}>
    {children}
    </List.Provider>
    );
};

export { List, ContextProvider };

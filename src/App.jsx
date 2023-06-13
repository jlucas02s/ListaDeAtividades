import "./App.css";
import { ContextProvider } from "./context";
import ListaAtividade from "./pages/ListaDeAtividades";
import ListCreate from "./pages/ListasCriadas";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    
      <ContextProvider>
        <Routes>
          <Route exact path="/" element={<ListaAtividade />} />
          <Route path="/view" element={<ListCreate />} />
        </Routes>
       </ContextProvider>
  
  );
}

export default App;

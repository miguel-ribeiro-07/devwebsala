import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Box from '@mui/material/Box';
import Login from "./pages/Login";
import CadastroCliente from "./pages/Cadastro/cliente";
import CadastroCaminhao from "./pages/Cadastro/caminhao";
import Inicio from "./pages/Inicio";
import Header from "./components/Header";
import Carga from "./pages/Cargas";

function Rotas() {
  return (
    <Box>
        <Router>
          <Header/>
            <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/cadastro-cliente" element={<CadastroCliente/>}/>
              <Route path="/cadastro-caminhao" element={<CadastroCaminhao/>}/>
              <Route path="/inicio/" element={<Inicio/>}/>
              <Route path="/carga" element={<Carga/>}/>
            </Routes>
        </Router>
    </Box>
);
}

export default Rotas;

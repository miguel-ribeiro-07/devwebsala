import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Box from '@mui/material/Box';
import Login from "./pages/Login";
import CadastroCliente from "./pages/Cadastro/cliente";
import CadastroCaminhao from "./pages/Cadastro/caminhao";
import CadastroCarga from "./pages/Cadastro/carga";
import Inicio from "./pages/Inicio";
import Header from "./components/Header";

function Rotas() {
  return (
    <Box>
        <Router>
          <Header/>
            <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/cadastro-cliente" element={<CadastroCliente/>}/>
              <Route path="/cadastro-caminhao" element={<CadastroCaminhao/>}/>
              <Route path="/cadastro-carga" element={<CadastroCarga/>}/>
              <Route path="/inicio/" element={<Inicio/>}/>
            </Routes>
        </Router>
    </Box>
);
}

export default Rotas;

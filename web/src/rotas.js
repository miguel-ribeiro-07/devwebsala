import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Box from '@mui/material/Box';
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Header from "./components/Header";
import CadastroCliente from "./pages/Cadastro/cliente";
import CadastroCaminhao from "./pages/Cadastro/caminhao";
import CadastroCarga from "./pages/Cadastro/carga";
import CadastroRota from "./pages/Cadastro/rota";
import CadastroEntrega from "./pages/Cadastro/entrega";
import InfoEntrega from "./pages/Motorista/infos";


function Rotas() {
  return (
    <Box>
        <Router>
          <Header/>
            <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/inicio/" element={<Inicio/>}/>
              <Route path="/cadastro-cliente" element={<CadastroCliente/>}/>
              <Route path="/cadastro-caminhao" element={<CadastroCaminhao/>}/>
              <Route path="/cadastro-carga" element={<CadastroCarga/>}/>
              <Route path="/cadastro-rota" element={<CadastroRota/>}/>
              <Route path="/cadastro-entrega" element={<CadastroEntrega/>}/>
              <Route path="/info-entrega" element={<InfoEntrega/>}/>
            </Routes>
        </Router>
    </Box>
);
}

export default Rotas;

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Box from '@mui/material/Box';
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Inicio from "./pages/Inicio";
import Header from "./components/Header";

function Rotas() {
  return (
    <Box>
        <Router>
          <Header/>
            <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/cadastro" element={<Cadastro/>} />
              <Route path="/inicio" element={<Inicio/>} />
            </Routes>
        </Router>
    </Box>
);
}

export default Rotas;

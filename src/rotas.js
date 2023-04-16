import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Box from '@mui/material/Box';
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

function Rotas() {
  return (
    <Box>
        <Router>
            <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/cadastro" element={<Cadastro/>} />
            </Routes>
        </Router>
    </Box>
);
}

export default Rotas;

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/Logo.png'
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MapIcon from '@mui/icons-material/Map';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddTaskIcon from '@mui/icons-material/AddTask';
import RoundaboutRightIcon from '@mui/icons-material/RoundaboutRight';
import {useNavigate} from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [state, setState] = React.useState(false);
  const userType = localStorage.getItem('userType')
  
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
      <Link to="/cadastro-cliente" style={{textDecoration:"none", color:'#000000'}}>
      <ListItem sx={{display: userType === 'Administrador' ? 'block' : 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <PersonAddIcon/>
          </ListItemIcon>
            <ListItemText primary="Cadastrar usuário" />
        </ListItemButton>
      </ListItem>
      </Link>
      <Link to="/cadastro-caminhao" style={{textDecoration:"none", color:'#000000'}}>
      <ListItem sx={{display: userType === 'Administrador' ? 'block' : 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <LocalShippingIcon/>
          </ListItemIcon>
            <ListItemText primary="Cadastrar caminhão" />
        </ListItemButton>
      </ListItem>
      </Link>
      <Link to="/cadastro-carga" style={{textDecoration:"none", color:'#000000'}}>
      <ListItem sx={{display: userType === 'Administrador' ? 'block' : 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <InventoryIcon/>
          </ListItemIcon>
            <ListItemText primary="Cadastrar carga" />
        </ListItemButton>
      </ListItem>
      </Link>
      <Link to="/cadastro-rota" style={{textDecoration:"none", color:'#000000'}}>
      <ListItem sx={{display: userType === 'Administrador' ? 'block' : 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <RoundaboutRightIcon/>
          </ListItemIcon>
            <ListItemText primary="Cadastrar rota" />
        </ListItemButton>
      </ListItem>
      </Link>
      <Link to="/cadastro-entrega" style={{textDecoration:"none", color:'#000000'}}>
      <ListItem sx={{display: userType === 'Administrador' ? 'block' : 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <AddTaskIcon/>
          </ListItemIcon>
            <ListItemText primary="Cadastrar entrega" />
        </ListItemButton>
      </ListItem>
      </Link>
      <Link to="/info-entrega" style={{textDecoration:"none", color:'#000000'}}>
      <ListItem sx={{display: userType === 'Motorista' ? 'block' : 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon/>
          </ListItemIcon>
            <ListItemText primary="Informações da entrega"/>
        </ListItemButton>
      </ListItem>
      </Link>
      <Link to="/update-entrega" style={{textDecoration:"none", color:'#000000'}}>
      <ListItem sx={{display: userType === 'Motorista' ? 'block' : 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <MapIcon/>
          </ListItemIcon>
            <ListItemText primary="Atualizar status da carga"/>
        </ListItemButton>
      </ListItem>
      </Link>
      <Link to="/andamento-entrega" style={{textDecoration:"none", color:'#000000'}}>
      <ListItem sx={{display: userType === 'Cliente' ? 'block' : 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <TaskAltIcon/>
          </ListItemIcon>
            <ListItemText primary="Andamento da entrega"/>
        </ListItemButton>
      </ListItem>
      </Link>
      </List>
    </Box>
  );
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={location.pathname === '/' ? 'display:none':'display:block'} position='static' >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <img onClick={() => navigate('/inicio')} src={logo} width='120px' height='60px' alt='logo'/>
          <Box flexGrow={1} />
          <IconButton
            size="large"
            aria-label="logout"
            onClick={() => {
              localStorage.removeItem('sessionId')
              localStorage.removeItem('userType')
              navigate('/')}}
            >
              <LogoutIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>  
        <>
          <Drawer
            anchor='left'
            open={state}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </>
    </Box>
    
  );
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/Logo.png'
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import RoundaboutRightIcon from '@mui/icons-material/RoundaboutRight';

export default function Header() {
  const location = useLocation()

  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer( false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
      <Link to="/cadastro" style={{textDecoration:"none", color:'#000000'}}>
      <ListItem >
        <ListItemButton>
          <ListItemIcon>
            <PersonAddIcon/>
          </ListItemIcon>
            <ListItemText primary="Cadastrar usuário" />
        </ListItemButton>
      </ListItem>
      </Link>
      <ListItem >
        <ListItemButton>
          <ListItemIcon>
            <LocalShippingIcon/>
          </ListItemIcon>
            <ListItemText primary="Cadastrar caminhão" />
        </ListItemButton>
      </ListItem>
      <ListItem >
        <ListItemButton>
          <ListItemIcon>
            <InventoryIcon/>
          </ListItemIcon>
            <ListItemText primary="Cadastrar carga" />
        </ListItemButton>
      </ListItem>
      <Link to="/carga" style={{textDecoration:"none", color:'#000000'}}>
      <ListItem >
        <ListItemButton>
          <ListItemIcon>
            <RoundaboutRightIcon/>
          </ListItemIcon>
            <ListItemText primary="Rotas" />
        </ListItemButton>
      </ListItem>
      </Link>
      </List>
    </Box>
  );
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={location.pathname === '/' ? 'display:none':'display:block'}position='static' >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} width='120px' height='60px'/>
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

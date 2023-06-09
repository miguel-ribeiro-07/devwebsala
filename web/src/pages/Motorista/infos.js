import * as React from 'react';
import {useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import api from '../../services/api';
import {useNavigate} from 'react-router-dom'

export default function InfoCarga() {

  //FINALIZAR ANTES A PARTE DE ENTREGA PARA QUE TENHAM MOTORISTAS VINCULADOS A ENTREGA

  const idSession = localStorage.getItem('sessionId')
  let [dadosPerfil, setDadosPerfil] = React.useState({})
  const navigate = useNavigate()

  useEffect(() =>{
    if (idSession === null) {navigate('/')}
    else getUser()
  }, [])

  async function getUser(){
    try {
      const response = await api.get(`/usuario/${idSession}`);
      const res = response.data;
      setDadosPerfil(res.usuario)
  
      if (res.error) {
        alert(res.message);
        return false;
      }

    } catch (err) {
      alert(err.message);
    }
  }


  return (
    <div>
    <Typography variant="h2">
        Bem vindo!
      </Typography>
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Tipo Perfil" secondary={dadosPerfil.tipoUser}/>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem sx={{display: dadosPerfil.tipoUser === 'Motorista' || dadosPerfil.tipoUser === 'Administrador' ? 'flex' : 'none' }}>
        <ListItemAvatar>
          <Avatar>
            <FingerprintIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="CPF" secondary={dadosPerfil.cpf} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem sx={{display: dadosPerfil.tipoUser === 'Cliente' ? 'flex' : 'none' }}>
        <ListItemAvatar>
          <Avatar>
            <FingerprintIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="CNPJ" secondary={dadosPerfil.cnpj} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Nome" secondary={dadosPerfil.nome} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EmailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="E-mail" secondary={dadosPerfil.email} />
      </ListItem>
    </List>
    </div>
  );
}
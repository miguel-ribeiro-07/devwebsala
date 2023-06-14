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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function InfoEntrega() {

  const idSession = localStorage.getItem('sessionId')
  let [entregas, setEntregas] = React.useState([])
  let [carga, setCarga] = React.useState({})
  let [rota, setRota] = React.useState({})
  let [selectId, setSelectId] = React.useState('')
  const navigate = useNavigate()


  async function filtrarEntrega(){
    try {
      const response = await api.post(`/entrega/filter`, {
        motoristaId:idSession
      });
      const res = response.data;
      setEntregas(res.entrega)
  
      if (res.error) {
        alert(res.message);
        return false;
      }

    } catch (err) {
      alert(err.message);
    }
  }

  async function filtrarCarga(id){
    try {
      const response = await api.get(`/carga/${id}`);
      const res = response.data;
      setCarga(res.carga)
  
      if (res.error) {
        alert(res.message);
        return false;
      }

    } catch (err) {
      alert(err.message);
    }
  }

  async function filtrarRota(id){
    try {
      const response = await api.get(`/rota/${id}`);
      const res = response.data;
      setRota(res.rota)
  
      if (res.error) {
        alert(res.message);
        return false;
      }

    } catch (err) {
      alert(err.message);
    }
  }


  const filtId = () =>{
    let result = entregas.find(e => e._id === selectId)

    if (result != undefined) {
      filtrarCarga(result.cargaId)
      filtrarRota(result.rotaId)
    }
  }


  useEffect(() =>{
    if (idSession === null) {navigate('/')}
    else 
    filtrarEntrega()
  }, [])

  useEffect(() =>
    filtId()
  ,[selectId])

  return (
    <div>
    <Typography sx={{marginLeft:4, marginTop:5, marginBottom:2}} variant="h4">
        Dados da entrega
      </Typography>
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <InputLabel sx={{marginLeft:9}} id="cargaLabel">Selecione uma entrega</InputLabel>
        <Select
          sx={{marginLeft:5}}
          labelId="carga"
          id="carga"
          value={selectId}
          onChange={(e) => {
            setSelectId(e.target.value)
          }}
          input={<OutlinedInput label="carga" />}
        >
          {entregas.map((data) => (
            <MenuItem
              key={data._id}
              value={data._id}
            >
              {data._id}
            </MenuItem>
          ))}
        </Select>
      <ListItem>
        <ListItemAvatar>
        </ListItemAvatar>
        <ListItemText primary="Tipo de carga" secondary={carga.tipoCarga}/>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
        </ListItemAvatar>
        <ListItemText primary="Local de saída" secondary={carga.origem} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
        </ListItemAvatar>
        <ListItemText primary="Local de destino" secondary={carga.destino} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
        </ListItemAvatar>
        <ListItemText primary="Rota a ser feita" secondary={rota.nomeRota} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
        </ListItemAvatar>
        <ListItemText primary="Ponto de parada 1" secondary={rota.ponto1} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
        </ListItemAvatar>
        <ListItemText primary="Ponto de parada 2" secondary={rota.ponto2 == '' ? 'Há apenas 1 ponto de parada': rota.ponto2} />
      </ListItem>
    </List>
    </div>
  );
}
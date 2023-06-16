import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import api from '../../services/api';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function StatusEntrega() {
  const idSession = localStorage.getItem('sessionId')
  const navigate = useNavigate()
  let [cargas, setCargas] = React.useState([])
  let [carga, setCarga] = React.useState({})
  let [entrega, setEntrega] = React.useState({})
  let [rota, setRota] = React.useState({})
  let [caminhao, setCaminhao] = React.useState({})
  let [selectCarga, setSelectCarga] = React.useState('')
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const steps = [
    "Cadastrado",
    "Em transporte",
    "Entregue"
  ];

  async function filtrarCarga(){
    try {
      const response = await api.post(`/carga/filter`, {
        usuarioId:idSession
      });
      const res = response.data;
      setCargas(res.carga)
  
      if (res.error) {
        alert(res.message);
        return false;
      }

    } catch (err) {
      alert(err.message);
    }
  }

  async function filtrarEntrega(id){
    try {
      const response = await api.post(`/entrega/filter`, {
        cargaId: id
      });
      const res = response.data;
      setEntrega(res.entrega[0])
  
      if (res.error) {
        alert(res.message);
        return false;
      }

    } catch (err) {
      alert(err.message);
    }
  }

  async function deletarEntrega(){
    try {
      const response = await api.delete(`/entrega/${entrega._id}`);
      await api.delete(`/carga/${carga._id}`);
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

  async function filtrarCaminhao(id){
    try {
      const response = await api.get(`/caminhao/${id}`);
      const res = response.data;
      setCaminhao(res.caminhao)
  
      if (res.error) {
        alert(res.message);
        return false;
      }

    } catch (err) {
      alert(err.message);
    }
  }


  const filtId = () =>{
    let result = cargas.find(e => e._id === selectCarga)

    setCarga(result)
    if (carga != undefined) {
      filtrarEntrega(carga._id)
    }
  }

  useEffect(() =>{
    if (idSession === null) {navigate('/')}
    else 
    filtrarCarga()
  }, [])

  useEffect(() =>{
    if (selectCarga != '') filtId()
  },[selectCarga])


  useEffect(() =>{
    if(entrega.rotaId && entrega.caminhaoId != undefined){
    filtrarRota(entrega.rotaId)
    filtrarCaminhao(entrega.caminhaoId)}
  },[entrega])


  return (
    <Box sx={{
      marginTop: 3,
      display: 'block',
      flexDirection: 'column',
    }}>
      <Stepper activeStep={entrega.statusEntrega == 'Cadastrado'? 1: entrega.statusEntrega == 'Em transporte' ? 2 : entrega.statusEntrega == 'Entregue' ? 3 : -1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography sx={{marginLeft:4, marginTop:5, marginBottom:2}} variant="h4">
        Dados da entrega
      </Typography>
      <InputLabel sx={{marginLeft:9}} id="entrega">Selecione uma das suas cargas</InputLabel>
        <Select
          sx={{marginLeft:5}}
          labelId="entrega"
          id="entrega"
          value={selectCarga}
          onChange={(e) => {
            setSelectCarga(e.target.value)
          }}
          input={<OutlinedInput label="entrega" />}
        >
          {cargas.map((data) => (
            <MenuItem
              key={data._id}
              value={data._id}
            >
              {data.nomeCarga}
            </MenuItem>
          ))}
        </Select>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        <ListItem>
          <ListItemAvatar>
          </ListItemAvatar>
          <ListItemText primary="Tipo da carga" secondary={carga.tipoCarga} />
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
          <ListItemText primary="Local atual" secondary={entrega.localAtual} />
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
          <ListItemText primary="Placa do caminhão" secondary={caminhao.placa} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
          </ListItemAvatar>
          <ListItemText primary="Modelo do caminhão" secondary={caminhao.modelo} />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <Button variant="contained" sx={{marginLeft:4, marginTop:5}} onClick={handleClickOpen} disabled={selectCarga == '' ? true : false }>Recebi o produto</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Recebeu o produto"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta ação excluirá sua entrega, realmente recebeu o produto ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não excluir</Button>
          <Button onClick={() => {
            deletarEntrega()
            navigate('/inicio')
            }}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

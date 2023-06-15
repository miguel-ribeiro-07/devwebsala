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


export default function StatusEntrega() {
  const idSession = localStorage.getItem('sessionId')
  const navigate = useNavigate()
  let [cargas, setCargas] = React.useState([])
  let [carga, setCarga] = React.useState([])
  let [entrega, setEntrega] = React.useState({})
  let [rota, setRota] = React.useState({})
  let [caminhao, setCaminhao] = React.useState({})
  let [selectCarga, setSelectCarga] = React.useState('')

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
    if (result != undefined) {
      filtrarEntrega(result._id)
    }
  }

  useEffect(() =>{
    if (idSession === null) {navigate('/')}
    else 
    filtrarCarga()
  }, [])

  useEffect(() =>{
    filtId()
  },[selectCarga])


  useEffect(() =>{
    if(entrega.rotaId && entrega.caminhaoId != undefined){
    filtrarRota(entrega.rotaId)
    filtrarCaminhao(entrega.caminhaoId)}
  },[entrega])

  console.log(entrega, rota, caminhao, carga)

  return (
    <Box sx={{ width: "100%", marginTop:10 }}>
      <Stepper activeStep={1} alternativeLabel>
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
    </Box>
  );
}

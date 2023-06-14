import * as React from 'react';
import {useEffect} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import api from '../../services/api';
import {useNavigate} from 'react-router-dom'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

export default function UpdateEntrega() {

  const idSession = localStorage.getItem('sessionId')
  let [att, setAtt] = React.useState({
    localAtual:'',
    statusEntrega:''
  })
  let [entregas, setEntregas] = React.useState([])
  let [carga, setCarga] = React.useState({})
  let [rota, setRota] = React.useState({})
  let [selectId, setSelectId] = React.useState('')
  let [locais, setLocais] = React.useState([])
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

  console.log(entregas)
  async function update(){
    try{
      const response = await api.put(`/entrega/${selectId}`, {
        ...att
      })
      
      const res = response.data

      if (res.error){
        alert(res.message)
        return false
      }

      alert('Atualização da entrega feita com sucesso!')

    }catch(err){
      alert(err.message)
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

  useEffect(() => {
    filtId()
  }, [selectId])

  useEffect(() => {
    let filterLocals = [
        carga.origem, 
        rota.ponto1, 
        rota.ponto2,
        carga.destino
    ].filter(e => e !== '')

    setLocais(filterLocals)

  }, [carga, rota])

  return (
    <div>
      <Box
          sx={{
            marginTop: 8,
            display: 'block',
            flexDirection: 'column',
          }}
        >
        <Typography sx={{marginLeft:1, marginTop:5, marginBottom:2}} variant="h4">
          Atualize os dados da entrega
        </Typography>
        <InputLabel sx={{marginLeft:9}} id="entregas">Entregas em seu usuário</InputLabel>
          <Select
            sx={{marginLeft:5}}
            labelId="entrega"
            id="entrega"
            value={selectId}
            onChange={(e) => {
              setSelectId(e.target.value)
            }}
            input={<OutlinedInput label="entrega" />}
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
          <InputLabel sx={{marginLeft:9}} id="local">Selecione o local atual</InputLabel>
          <Select
            sx={{marginLeft:5}}
            labelId="local"
            id="local"
            value={att.localAtual}
            onChange={(e) => {
              setAtt({...att,  localAtual: e.target.value})
            }}
            input={<OutlinedInput label="local" />}
          >
            {locais.map((data) => (
              <MenuItem
                key={data}
                value={data}
              >
                {data}
              </MenuItem>
            ))}
          </Select>
          <InputLabel sx={{marginLeft:9}} id="status">Selecione o status do transporte</InputLabel>
          <Select
            sx={{marginLeft:5}}
            labelId="status"
            id="status"
            value={att.statusEntrega}
            onChange={(e) => {
              setAtt({...att,  statusEntrega: e.target.value})
            }}
            input={<OutlinedInput label="status" />}
          >
            <MenuItem value='Em transporte'>Em transporte</MenuItem>
            <MenuItem value='Entregue' >Entregue</MenuItem>
          </Select>

          <Grid item xs={8} sx={{marginLeft:5, marginTop:3}}>
            <Button variant='contained' onClick={()=> update()} >Atualizar</Button>
          </Grid>
        </Box>
    </div>
  );
}
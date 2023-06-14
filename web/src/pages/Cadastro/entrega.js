import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import api from '../../services/api';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const CadastroEntrega = () => {
  let [entrega, setEntrega] = React.useState({
    cargaId:'',
    motoristaId:'',
    caminhaoId:'',
    rotaId:'',
    localAtual:''
  })
  let [carga, setCarga] = React.useState([])
  let [motorista, setMotorista] = React.useState([])
  let [caminhao, setCaminhao] = React.useState([])
  let [rota, setRota] = React.useState([])

  async function cadastrar(){
    try {
      const response = await api.post('/entrega', { ...entrega });
      const res = response.data;
  
      if (res.error) {
        alert(res.message);
        return false;
      }

      alert('Cadastrado com sucesso')
    } catch (err) {
      alert(err.message);
    }
  }

  async function allCargas(){
    try {
      const response = await api.get('/carga');
      const res = response.data;
  
      if (res.error) {
        alert(res.message);
        return false;
      }

      setCarga(res.carga)
      
    } catch (err) {
      alert(err.message);
    }
  }
  
  async function allCaminhao(){
    try {
      const response = await api.get('/caminhao');
      const res = response.data;
  
      if (res.error) {
        alert(res.message);
        return false;
      }

      setCaminhao(res.caminhoes)
  
      
    } catch (err) {
      alert(err.message);
    }
  }
  
  async function allRotas(){
    try {
      const response = await api.get('/rota');
      const res = response.data;
  
      if (res.error) {
        alert(res.message);
        return false;
      }

      setRota(res.rota)
      
    } catch (err) {
      alert(err.message);
    }
  }



  async function filtrarMotorista(){
    try {
      const response = await api.post('/usuario/filter', {
        tipoUser:'Motorista'
      });
      const res = response.data;
  
      if (res.error) {
        alert(res.message);
        return false;
      }

      setMotorista(res.map(e =>{
        return {cpf: e.cpf, nome: e.nome, id: e._id}
      }))
  
      
    } catch (err) {
      alert(err.message);
    }
  }

  const filtrarCargaId = (point) =>{
    let found = carga.find((e) => 
      e._id == entrega.cargaId

    )
    if (found == undefined || point == undefined) return ''
    else if (point == 'origem') return found.origem
    else if (point == 'destino') return found.destino
  }


  useEffect(() =>{
    allCargas()
    allCaminhao()
    allRotas()
    filtrarMotorista()
  },[])

  useEffect(() =>{
    setEntrega({...entrega, localAtual:filtrarCargaId('origem'), })
  },[entrega.cargaId])


  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center'
          }}
        >
          <Typography component="h1" variant="h5">
            Cadastrar entrega
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel id="cargaLabel">Carga da entrega</InputLabel>
                <Select
                  labelId="carga"
                  id="carga"
                  value={entrega.cargaId}
                  onChange={(e) => {
                    setEntrega({...entrega, cargaId:e.target.value})
                  }}
                  input={<OutlinedInput label="carga" />}
                >
                    {carga.map((carga) => (
                        <MenuItem
                        key={carga._id}
                        value={carga._id}
                        >
                        {carga.nomeCarga}
                        </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="motoristaLabel">Motorista da entrega</InputLabel>
                <Select
                  labelId="motorista"
                  id="motorista"
                  value={entrega.motoristaId}
                  onChange={(e) => {setEntrega({...entrega, motoristaId:e.target.value})}}
                  input={<OutlinedInput label="motorista" />}
                >
                    {motorista.map((motorista) => (
                        <MenuItem
                        key={motorista.id}
                        value={motorista.id}
                        >
                        {`${motorista.nome} -  Documento: ${motorista.cpf} `}
                        </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="caminhaoLabel">Caminhao da entrega</InputLabel>
                <Select
                  labelId="caminhao"
                  id="caminhao"
                  value={entrega.caminhaoId}
                  onChange={(e) => {setEntrega({...entrega, caminhaoId:e.target.value})}}
                  input={<OutlinedInput label="caminhao" />}
                >
                    {caminhao.map((caminhao) => (
                        <MenuItem
                        key={caminhao._id}
                        value={caminhao._id}
                        >
                        {caminhao.nomeCaminhao}
                        </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="rotaLabel">Rota da entrega</InputLabel>
                <Select
                  labelId="rota"
                  id="rota"
                  value={entrega.rotaId}
                  onChange={(e) => {setEntrega({...entrega, rotaId:e.target.value})}}
                  input={<OutlinedInput label="rota" />}
                >
                    {rota.map((rota) => (
                        <MenuItem
                        key={rota._id}
                        value={rota._id}
                        >
                        {rota.nomeRota}
                        </MenuItem>
                    ))}
                </Select>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => cadastrar()}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

export default CadastroEntrega
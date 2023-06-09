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


const CadastroCarga = () => {
  let [carga, setCarga] = React.useState({
    nomeCarga: '',
    usuarioId:'',
    tipoCarga:'',
    peso:null,
    altura:null,
    largura:null,
    origem:'',
    destino:''
  })
  let [clientes, setClientes] = React.useState([])

  async function cadastrar(){
    try {
      const response = await api.post('/carga', { ...carga });
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

  async function filtrarCliente(){
    try {
      const response = await api.post('/usuario/filter', {
        tipoUser:'Cliente'
      });
      const res = response.data;
  
      if (res.error) {
        alert(res.message);
        return false;
      }

      setClientes(res.map(e =>{
        return {cnpj: e.cnpj, id: e._id}
      }))
  
      
    } catch (err) {
      alert(err.message);
    }
  }


  useEffect(() =>{
    filtrarCliente()
  },[])


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
            Cadastrar carga
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nome"
                  label="Nome Carga"
                  value={carga.nomeCarga}
                  name="nome"
                  autoComplete="nome"
                  onChange={(e) => {setCarga({...carga, nomeCarga:e.target.value})}}
                />
              </Grid>
              <Grid item xs={12}>
              <InputLabel id="docCliente">CNPJ pertecente</InputLabel>
                <Select
                  labelId="docCliente"
                  id="docCliente"
                  value={carga.usuarioId}
                  onChange={(e) => {setCarga({...carga, usuarioId:e.target.value})}}
                  input={<OutlinedInput label="Name" />}
                >
                  {clientes.map((cliente) => (
                    <MenuItem
                      key={cliente.id}
                      value={cliente.id}
                    >
                      {cliente.cnpj}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
              <TextField
                  required
                  fullWidth
                  select
                  name="tipo-carga"
                  label="Tipo Carga"
                  type="tipo-carga"
                  id="tipo-carga"
                  value={carga.tipoCarga}
                  onChange={(e) => {setCarga({...carga, tipoCarga:e.target.value})}}
                >
                <MenuItem key={'Sem riscos'} value={'Carga sem riscos'}>Carga sem riscos</MenuItem>
                <MenuItem key={'Frágil'} value={'Carga Frágil'}>Carga Frágil</MenuItem>
                <MenuItem key={'Perigosa'} value={'Carga Perigosa'}>Carga Perigosa</MenuItem>
                <MenuItem key={'Viva'} value={'Carga Viva'}>Carga Viva</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="peso"
                  label="Peso"
                  type='number'
                  value={carga.peso}
                  id="peso"
                  autoComplete="altura"
                  onChange={(e) => {setCarga({...carga, peso:e.target.value})}}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="altura"
                  label="Altura"
                  type='number'
                  value={carga.altura}
                  id="altura"
                  autoComplete="altura"
                  onChange={(e) => {setCarga({...carga, altura:e.target.value})}}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  name="lagura"
                  label="Largura"
                  type='number'
                  value={carga.largura}
                  id="largura"
                  autoComplete="largura"
                  onChange={(e) => {setCarga({...carga, largura:e.target.value})}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="origem"
                  label="Origem"
                  value={carga.origem}
                  id="origem"
                  autoComplete="origem"
                  onChange={(e) => {setCarga({...carga, origem:e.target.value})}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="destino"
                  label="Destino"
                  value={carga.destino}
                  id="destino"
                  autoComplete="destino"
                  onChange={(e) => {setCarga({...carga, destino:e.target.value})}}
                />
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

export default CadastroCarga
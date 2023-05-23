import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import api from '../../services/api';


const CadastroCaminhao = () => {
  let [caminhao, setCaminhao] = React.useState({
    nomeCaminhao: '',
    modelo:'',
    placa:'',
    fabricacao:''
  })

  async function cadastrar(){
    try {
      const response = await api.post('/caminhao', { ...caminhao });
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

  useEffect(()=>{

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
            Cadastrar caminhão
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  required
                  name="nome"
                  fullWidth
                  id="nome"
                  label="Nome do caminhão"
                  value={caminhao.nomeCaminhao}
                  onChange={(e) => {setCaminhao({...caminhao, nomeCaminhao:e.target.value})}}
                />
                
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="modelo"
                  label="Modelo"
                  value={caminhao.modelo}
                  name="modelo"
                  autoComplete="modelo"
                  onChange={(e) => {setCaminhao({...caminhao, modelo:e.target.value})}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="placa"
                  label="Placa"
                  value={caminhao.placa}
                  id="placa"
                  autoComplete="placa"
                  onChange={(e) => {setCaminhao({...caminhao, placa:e.target.value})}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="fabricacao"
                  label="Ano Fabricação"
                  value={caminhao.fabricacao}
                  id="fabricacao"
                  autoComplete="fabricacao"
                  onChange={(e) => {setCaminhao({...caminhao, fabricacao:e.target.value})}}
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

export default CadastroCaminhao
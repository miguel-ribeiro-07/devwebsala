import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import api from '../../services/api';


const CadastroRota = () => {
  let [rota, setRota] = React.useState({
    nomeRota: '',
    ponto1:'',
    ponto2:'',
    tempo:''
  })
  let [disabled, setDisabled] = React.useState(true)

  async function cadastrar(){
    try {
      const response = await api.post('/rota', { ...rota });
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
            Cadastrar rota
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  name="nome"
                  fullWidth
                  id="nome"
                  label="Nome da rota"
                  value={rota.nomeRota}
                  onChange={(e) => {setRota({...rota, nomeRota:e.target.value})}}
                />
                
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  id="ponto1"
                  label="Ponto de parada 1"
                  value={rota.ponto1}
                  name="ponto1"
                  onChange={(e) => {setRota({...rota, ponto1:e.target.value})}}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  name="ponto2"
                  disabled={disabled}
                  label="Ponto de parada 2"
                  value={rota.ponto2}
                  id="placa"
                  onChange={(e) => {setRota({...rota, ponto2:e.target.value})}}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1.5, mb: 0 }}
                        onClick={() => {
                            setDisabled(false)
                        }}
                >+</Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1.5, mb: 0 }}
                        onClick={() => {
                            setDisabled(true)
                            setRota({...rota, ponto2:''})
                        }}
                >-</Button>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  type='number'
                  name="tempo"
                  label="Horas de viagem"
                  value={rota.tempo}
                  id="tempo"
                  onChange={(e) => {setRota({...rota, tempo:e.target.value})}}
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

export default CadastroRota
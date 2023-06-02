import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import logo from '../../images/Logo.png'
import Typography from '@mui/material/Typography';
import api from '../../services/api'
import {useNavigate} from 'react-router-dom'



export default function Login() {
  const navigate = useNavigate()
  let [userLogin, setUserLogin] = React.useState({
    email:'',
    senha:''
  })

  async function validarLogin(){
    try {
      const response = await api.post('/usuario/filter', { ...userLogin });
      const res = response.data;
  
      if (res.error) {
        alert(res.message);
        return false;
      }
      const usuario = res[0]
      localStorage.setItem('sessionId', usuario._id)
      localStorage.setItem('userType', usuario.tipoUser)
      if (userLogin.email == usuario.email && userLogin.senha == usuario.senha) navigate(`/inicio/`)

    } catch (err) {
      console.log(err.message);
    }
  }

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://blogwlmscania.itaipumg.com.br/wp-content/uploads/2018/02/tipos-de-caminhao.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={logo} alt='logo' sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </img>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                value={userLogin.email}
                name="email"
                autoComplete="email"
                onChange={(e) => setUserLogin({...userLogin, email:e.target.value})}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                value={userLogin.senha}
                type="password"
                onChange={(e) => setUserLogin({...userLogin, senha:e.target.value})}
                id="senha"
              />
              <Button
                fullWidth
                variant="contained"
                onClick={ async () => validarLogin()}
                sx={{ mt: 3, mb: 2 }}
              >
                Fazer Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}

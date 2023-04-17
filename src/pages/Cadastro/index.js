import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logo from '../../images/Logo.png'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Cadastro = () => {
  const [alignment, setAlignment] = React.useState('adm');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
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
            <img src={logo} alt='logo'></img>
          <Typography component="h1" variant="h5">
            Cadastrar usuário
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="cpf"
                  name="cpf"
                  fullWidth
                  id="cpf"
                  label="CPF"
                  disabled={alignment === 'client' ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="cnpj"
                  name="cnpj"
                  fullWidth
                  id="cnpj"
                  label="CNPJ"
                  disabled={alignment === 'adm' || alignment === 'driver' ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="nome"
                  fullWidth
                  id="nome"
                  label="Nome"
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  fullWidth
                  name="senha"
                  label="Senha"
                  type="senha"
                  id="senha"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value="adm">Administrador</ToggleButton>
                <ToggleButton value="driver">Motorista</ToggleButton>
                <ToggleButton value="client">Cliente</ToggleButton>
              </ToggleButtonGroup>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

export default Cadastro
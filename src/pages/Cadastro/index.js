import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ReceiptRounded } from '@mui/icons-material';

const Cadastro = () => {
  const [alignment, setAlignment] = React.useState('adm');
  const [errorCPF, setErrorCPF] = React.useState(false)
  const [helpCPF, setHelpCPF] = React.useState("")
  const [errorCNPJ, setErrorCNPJ] = React.useState(false)
  const [helpCNPJ, setHelpCNPJ] = React.useState("")

  let [CPF, setCPF] = React.useState("")
  
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  }

  function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (let i =1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) )  return (setErrorCPF(true), setHelpCPF("Digite um cpf válido"))

  Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return (setErrorCPF(true), setHelpCPF("Digite um cpf válido"))
  
    return (setErrorCPF(false), setHelpCPF("")) ;
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
            Cadastrar usuário
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errorCPF}
                  autoComplete="cpf"
                  name="cpf"
                  fullWidth
                  id="cpf"
                  label="CPF"
                  disabled={alignment === 'client' ? true : false}
                  onChange={(e) => {setCPF(e.target.value)}}
                  helperText={helpCPF}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errorCNPJ}
                  autoComplete="cnpj"
                  name="cnpj"
                  fullWidth
                  id="cnpj"
                  label="CNPJ"
                  disabled={alignment === 'adm' || alignment === 'driver' ? true : false}
                  helperText={helpCNPJ}
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
              onClick={() => TestaCPF(CPF)}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

export default Cadastro
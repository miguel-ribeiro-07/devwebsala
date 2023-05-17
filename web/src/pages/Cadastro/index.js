import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import api from '../../services/api';


const Cadastro = () => {
  const [alignment, setAlignment] = React.useState('adm');
  const [errorCPF, setErrorCPF] = React.useState(false)
  const [helpCPF, setHelpCPF] = React.useState("")
  const [errorCNPJ, setErrorCNPJ] = React.useState(false)
  const [helpCNPJ, setHelpCNPJ] = React.useState("")
  let [usuario, setUsuario] = React.useState({
    tipoUser: '',
    cpf: '',
    cnpj: '',
    nome: '',
    email:'',
    senha:''
  })
  
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setUsuario({...usuario, cpf:''})
    setUsuario({...usuario, cnpj:''})
    setErrorCPF(false)
    setErrorCNPJ(false)
    setHelpCNPJ('')
    setHelpCPF('')
  }

  async function cadastrar(){
    try {
      const response = await api.post('/usuario', { ...usuario });
      const res = response.data;
  
      if (res.error) {
        alert(res.message);
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(()=>{
    setUsuario({...usuario, tipoUser:alignment})
  }, [alignment])

  function validarCPF(strCPF) {
    let Soma;
    let Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (let i =1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) )  return (setErrorCPF(true), setHelpCPF("Digite um CPF válido"))

  Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return (setErrorCPF(true), setHelpCPF("Digite um CPF válido"))
  
    return (setErrorCPF(false), setHelpCPF(""), cadastrar()) ;
  }
  
  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj === '') return (setErrorCNPJ(true), setHelpCNPJ("Digite um CNPJ válido")) ;
     
    if (cnpj.length != 14)
      return (setErrorCNPJ(true), setHelpCNPJ("Digite um CNPJ válido"));
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj === "00000000000000" || 
        cnpj === "11111111111111" || 
        cnpj === "22222222222222" || 
        cnpj === "33333333333333" || 
        cnpj === "44444444444444" || 
        cnpj === "55555555555555" || 
        cnpj === "66666666666666" || 
        cnpj === "77777777777777" || 
        cnpj === "88888888888888" || 
        cnpj === "99999999999999")
        return (setErrorCNPJ(true), setHelpCNPJ("Digite um CNPJ válido"));
         
    // Valida DVs

    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
      return (setErrorCNPJ(true), setHelpCNPJ("Digite um CNPJ válido"));
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
      return (setErrorCNPJ(true), setHelpCNPJ("Digite um CNPJ válido"));
           
    return (setErrorCNPJ(false), setHelpCNPJ(""), cadastrar());
    
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
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errorCPF}
                  autoComplete="cpf"
                  name="cpf"
                  fullWidth
                  id="cpf"
                  label="CPF"
                  value={usuario.cpf}
                  disabled={alignment === 'client' ? true : false}
                  onChange={(e) => {setUsuario({...usuario, cpf:e.target.value})}}
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
                  value={usuario.cnpj}
                  disabled={alignment === 'adm' || alignment === 'driver' ? true : false}
                  onChange={(e) => {setUsuario({...usuario, cnpj:e.target.value})}}
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
                  value={usuario.nome}
                  onChange={(e) => {setUsuario({...usuario, nome:e.target.value})}}
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  value={usuario.email}
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {setUsuario({...usuario, email:e.target.value})}}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  fullWidth
                  name="senha"
                  label="Senha"
                  value={usuario.senha}
                  type="password"
                  id="senha"
                  autoComplete="new-password"
                  onChange={(e) => {setUsuario({...usuario, senha:e.target.value})}}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                if(usuario.cpf !== '') validarCPF(usuario.cpf)
                else if (usuario.cnpj !== '') validarCNPJ(usuario.cnpj) 
                else if (usuario.cpf === '' && usuario.cnpj === '') alert('Preencha o CPF ou CNPJ')
            }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

export default Cadastro
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_IP from 'views/config';
import Swal from 'sweetalert2';

import ico from 'assets/img/favicon.png'
// TODO remove, this demo shouldn't need to reset the theme.


export function Signup() {
  const [values, setValues] = React.useState({
    firstname: '',
    lastname:'',
    email:'',
    role:'logistique de projet',
    region: 'RALM',
    occupation: '',
    pass: ''})
  const navigate = useNavigate();
  setTimeout(function() {
    Swal.close();
  }, 3000);
  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      let response = await axios.post(`http://${API_IP}:3000/api/signup`, values)
      if(response) {
       
        if(response.data.succes){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'vous etes inscrit',
            showConfirmButton: false,
            timer: 1500
          })
            navigate('../Login', { replace: true }) 
        }
        if(response.data.erreur){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "verifier vos formulaires!",
            footer: '<a href="#">besoin d" aide?</a>',
            
          })       
        }
     
          window.location.reload();

                    
                    }
     }
    catch (error) {
      console.log(error)
    }}
  
  
/*
  function handleSubmit(e){
   
      axios.post(`http://${API_IP}:3000/api/signup`, values)
      .then(
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'vous etes inscrit',
          showConfirmButton: false,
          timer: 1500
        }),
          navigate('../Login', { replace: true }) 
        )
   }*/
    
       
       
  
  

  return (
   
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{               
            backgroundImage: 'url(https://source.unsplash.com/random?ordinateur)',
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
            <img src={ico} width={100} alt="Logo" />
            <Typography component="h1" variant="h5">
              S'inscrire 
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Nom"
                    label="Nom"
                    name="Nom"
                    onChange={e => setValues({ ...values,firstname: e.target.value })}
                    autoComplete="Nom"
                    autoFocus
                  />
    
               <TextField
                margin="normal"
                required
                fullWidth
                id="Prenom"
                label="Prenom"
                name="Prenom"
                onChange={e => setValues({ ...values, lastname: e.target.value })}
                autoComplete="Prenom"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                onChange={e => setValues({ ...values, email: e.target.value })}
                autoComplete="email"
                autoFocus
              />  
               <select onChange={e => setValues({ ...values, role: e.target.value })}>
                            <option value="logistique de projet">logistique de projet</option>
                            <option value="Responsable logistique et ses assistants">Responsable logistique et ses assistants</option>
                         
                       </select>
                     
                      <select onChange={e => setValues({ ...values, region: e.target.value })}>
                        <option value="RALM">Alaotra Mangoro</option>
                        <option value="RAMM">Amoron'i Mania</option>
                        <option value="RANA">Analamanga</option>
                        <option value="RANJ">Analanjorofo</option>
                        <option value="RAND">Androy</option>
                        <option value="RANO">Anosy</option>
                        <option value="RATN">Atsimo Andrefana</option>
                        <option value="RATA">Atsimo Atsinanana</option>
                        <option value="RATS">Atsinanana</option>
                        <option value="RBET">Betsiboka</option>
                        <option value="RBOE">Boeny</option>
                        <option value="RBON">Bongolava</option>
                        <option value="RDIA">Diana</option>
                        <option value="RIHO">Ihorombe</option>
                        <option value="RITA">Itasy</option>
                        <option value="RHAM">Mahatsiatra Ambony</option>
                        <option value="RMEL">Melaky</option>
                        <option value="RMEN">Menabe</option>
                        <option value="RSAV">Sava</option>
                        <option value="RSOF">SOFIA</option>
                        <option value="RVAK">Vakinakaratra</option>
                        <option value="VATO">Vatovavy</option>
                        <option value="FITO">FITOVINANY</option>
                      </select>
               <TextField
                margin="normal"
                required
                fullWidth
                id="occupation"
                label="occupation"
                name="occupation"
                onChange={e => setValues({ ...values, occupation: e.target.value })}
                autoComplete="occupation"
                autoFocus
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="mot de passe"
                label="mot de passe"
                type="password"
                onChange={e => setValues({ ...values, pass: e.target.value })}
                id="mot de passe"
            
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Confirmer mot de passe"
                label="Confirmermot de passe"
                type="password"
               
                id="mot de passe"
            
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contact"
                label="telephone"
                type="telephone"
                onChange={e => setValues({ ...values, phone: e.target.value })}
                id="phone"
             
                autoFocus
              />
             {/*<FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Souviens-toi de moi"
              /> */} 
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                S'inscrire
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                  Mot de passe oublié
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="../Login" variant="body2">
                    {"Vous avez deja de compte ? Se connecter"}
                  </Link>
                </Grid>
              </Grid>
               
            </Box>
          </Box>
        </Grid>
      </Grid>
  
  );
}

export default Signup;
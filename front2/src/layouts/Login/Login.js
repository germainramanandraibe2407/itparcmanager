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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import API_IP from 'views/config';
import Swal from 'sweetalert2';
import { Col, Row } from 'reactstrap';
import ico from 'assets/img/favicon.png'
// TODO remove, this demo shouldn't need to reset the theme.

export function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
   
  })
  
localStorage.token = JSON.stringify({
nom: "",
occupation: "",
prenom: "",
role: "",
token:"" 
 })

let error = JSON.parse(localStorage.getItem("err"))
    
const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      let response = await axios.post(`http://${API_IP}:3000/api/login`, values)   

      if(response) {
       
        if(response.data){
          if(response.data.err1){
          
            let err=response.data
            localStorage.err = JSON.stringify(err)
             err = JSON.parse(localStorage.getItem("err"))
             window.location.reload()
          }else if(response.data.err2){
         
            let err=response.data
            localStorage.err = JSON.stringify(err)
             err = JSON.parse(localStorage.getItem("err"))
             window.location.reload()
          } else { 
            if (response.data.token)
            { 
              const credential = response.data;
              console.log(credential)
              localStorage.token = JSON.stringify(credential)
              let tokenLocal = JSON.parse(localStorage.getItem("token"))
              if(tokenLocal){
                axios.post(`http://${API_IP}:3000/api/AfficheMouvement/Mouvement/ajouthistoriques`,
                ({ nom:tokenLocal.nom,prenom:tokenLocal.prenom,action:"connecté"}))
              }
             

              navigate('../admin/Dashboard', { replace: true }) 
              localStorage.removeItem("err")
           
             
         
         
              window.location.reload();}
       
        }
          
        }
        
      }
       
    } catch (error) {
      console.log(error)
    }
   
       /* (function (error) {
             if (error){
              navigate('../Login', { replace: true })
             }
              })*/
      
          
      
    
        /*navigate('../Admin', { replace: true })*/
       
   
     
  }
 

  

  return (
    
      <Grid container component="main" sx={{ height: '10vh' }}>
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
             <h2>Gestionnaire de materiel</h2> 
            <Box  component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }} >
              <Row>
               
                <Col md="12">
                      <TextField
                      onChange={e =>{setValues({ ...values, email: e.target.value })} }
                    
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      type='text'
                      label="email"
                      name="email"         
                    /> 
                </Col>
         {(error)&& (error.err1)&&(<h1 className="text-primary"
          style={{ fontSize: '24px', fontWeight: 'bold'}}
         >{error.err1}</h1>)}
              </Row>
              
              <TextField
                onChange={e => setValues({ ...values, password: e.target.value })}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete=""
              />
                 {(error)&&(error.err2)&&(<h1 className="text-primary">{error.err2}</h1>)}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Souviens-toi de moi"
              />
              
              <Button
                        
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                         Se Connecter
              </Button>
              
                
           
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                  Mot de passe oublié
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="../Signup" variant="body2">
                    {"Vous n'avez pas de compte ? S'inscrire"}
                  </Link>
                </Grid>
              </Grid>
               
              </Box>
          </Box>
        </Grid>
      </Grid>)
    
   
  
}

export default Login;
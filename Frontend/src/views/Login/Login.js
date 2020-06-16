import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";
import "assets/css/material-dashboard-react.css?v=1.8.0";

// core components
import Admin from "../../layouts/Admin";
import RTL from "../../layouts/RTL";

const hist = createBrowserHistory();

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://cadisjoyas.cl/">
        Joyeía Cadis
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  rojito: {
    color: '#FF0000',
    fontWeight: 'bold'
  }
}));

const Inicio = () => (
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/admin/inicio" />
    </Switch>
  </Router>
);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      password: null,
      usuario: null,
      estado: null
    }
    this.EnviarDatos = this.EnviarDatos.bind(this)
  }

  EnviarDatos() { //
    console.log('usuario: ' + this.state.usuario)
    console.log('password: ' + this.state.password)

    fetch('/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      rut: this.state.usuario,
      password: this.state.password,
    })
    })
    .then( (response) => {
      console.log(response)
      if(response.status === 201) {
        console.log("LOGEADO")
        this.setState({estado: 'Logeado Correctamente!'})
        ReactDOM.render(<Inicio/>, document.getElementById('root'))
      } else {
        console.log('FALLO EL INGRESO')
        this.setState({estado: 'Fallo el inicio de sesion!'})
      }
      
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render(){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicio de sesión
          </Typography>
          <form className={styles.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="rut"
              label="Rut"
              name="rut"
              autoComplete="rut"
              autoFocus
              onChange={(event) => this.setState({usuario:event.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label="Contraseña"
              type="contraseña"
              id="contraseña"
              autoComplete="current-password"
              onChange={(event) => this.setState({password:event.target.value})}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.EnviarDatos}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvide la contraseña
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <label style={{color: '#FF0000', fontWeight: 'bold'}}>{this.state.estado}</label>

          <Copyright />
        </Box>
      </Container>
    );
  }
}

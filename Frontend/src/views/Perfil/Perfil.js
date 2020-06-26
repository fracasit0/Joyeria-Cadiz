import React from "react";
// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

import avatar from "assets/img/faces/user.png";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
};

export default class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      perfil: null,
      isReady: false
      
    }
  }
  
  getUsuario = () => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(this.state.perfil)
        console.log(this.state.perfil.nombre)
      }, 100)
      this.setState({
        perfil: JSON.parse(localStorage.getItem('usuario')),
        isReady: true
      })
    })
    
  }

  componentDidMount() {
    this.getUsuario();
    
  }

  render() {
    if(this.state.isReady === true) {
      return (
        <GridContainer>
          {/* <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 style={styles.cardTitleWhite}>Editar perfil</h4>
                <p style={styles.cardCategoryWhite}>Completa la siguiente informacion para editar tu usuario</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Nombre Usuario"
                      id="nombre"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Rut"
                      id="rut"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Telefono"
                      id="phone"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Dia"
                          id="dia"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Mes"
                          id="mes"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Año"
                          id="ano"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <InputLabel style={{ color: "#AAAAAA" }}>Fecha de nacimiento</InputLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Salario"
                      id="salario"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Sucursal"
                      id="sucursal"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary">Actualizar</Button>
              </CardFooter>
            </Card>
          </GridItem> */}
          <GridItem xs={12} sm={12} md={12} style={{display: 'flex',  justifyContent:'center', height: '100vh'}}>
            <Card profile style = {{width: 580, height: 400}}>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h1 style={{fontWeight: 'bold'}}>{this.state.perfil.nombre}</h1>
                {this.state.sucursal === '0' &&
                  <h4 style={{fontWeight: 'bold'}}>{this.state.perfil.rol} de Lo castillo</h4>
                }
                {this.state.sucursal === '1' &&
                  <h4 style={{fontWeight: 'bold'}}>{this.state.perfil.rol} Apumanque</h4>
                }
                {this.state.sucursal === '2' &&
                  <h4 style={{fontWeight: 'bold'}}>{this.state.perfil.rol} de Vitacura</h4>
                }
                
                <div style={{textAlign: 'left'}}>
                  <p>RUT: {this.state.perfil.rut}</p>
                  <p>Fecha nacimiento: {this.state.perfil.nacimiento}</p>
                  <p>Telefono: {this.state.perfil.telefono}</p>
                  <p>Email: {this.state.perfil.email}</p>
                  <p>Sucursal: {this.state.perfil.sucursal}</p>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      );
    } else if(this.state.isReady == false) {
      return (
        <div>
           cargando
        </div>
      )
    }
  }
}

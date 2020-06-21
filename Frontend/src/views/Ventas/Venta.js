import React from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import MenuItem from '@material-ui/core/MenuItem';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import {  Transfer,
          Form,
          Input,
          Button,
          Radio,
          Select,
          Cascader,
          DatePicker,
          InputNumber,
          TreeSelect,
          Switch  } from 'antd';
import { Grid } from '@material-ui/core';


export default class Ventas extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      ready: false,
      ListaProductos: "",
      descuento: '',
      metodo_pago: 'efectivo',
      vendedor: '',
      sucursal: '0',
      total: 0,
      suma: 0,
      indexMetodo: 0,
      indexSucursal: 0,
      completado: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.ActualizarInventario = this.ActualizarInventario.bind(this)
  }

  ActualizarInventario() {
    fetch('/productos')
      .then(res => {
          console.log(res);
          return res.json()
      })
      .then(users => {
          this.setState({ListaProductos: users, ready: true})
          this.getMock();
      });
  }

  state = {
    mockData: [],
    targetKeys: [],
  };

  EliminarProducto(oldData) {
    console.log(oldData._id)
    fetch('/delete_producto/' + oldData._id, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: oldData._id,
    })
    })
    .then( (response) => {
        if(response.status === 201) {
            console.log("Eliminado correctamente")
        } else {
            console.log('Hubo un error')
        }
    })
    .catch((error) => {
        console.log(error)
    });
  }

  componentDidMount() {
    this.ActualizarInventario()
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < this.state.ListaProductos.length; i++) {
      const data = {
        key: this.state.ListaProductos[i],
        title: `${this.state.ListaProductos[i].tipo} ${this.state.ListaProductos[i].material} ${this.state.ListaProductos[i].descripcion} ${this.state.ListaProductos[i].piedra} $${this.state.ListaProductos[i].precio}`,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  CalcularTotal = () => {
    let tot = 0;
    for(let i = 0; i<this.state.targetKeys.length;i++) {
      tot = tot + this.state.targetKeys[i].precio;
    }
    let resultado = tot*(1-(this.state.descuento/100));
    this.setState({total:resultado})
    this.setState({suma:tot})
  }

  handleChange = targetKeys => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        this.CalcularTotal();
      }, 300)
      this.setState({ targetKeys });
    })
  };

  handleInputChange(property) {
    return e => {
      this.setState({
        [property]: e.target.value
      });
    };
  }

  renderFooter = () => (
    <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getMock}>
      Actualizar
    </Button>
  );


  imprimir = () => {
    fetch('/crear_venta', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lista: this.state.targetKeys,
        metodo_pago: this.state.metodo_pago,
        descuento: this.state.descuento,
        sucursal: this.state.sucursal,
        vendedor: this.state.vendedor,
        total: this.state.total
      })
      })
      .then( (response) => {
          if(response.status === 201) {
              console.log("Añadido correctamente")
              this.setState({completado: 1})
          } else {
              console.log('Hubo un error')
              this.setState({completado: 2})
          }
      })
      .catch((error) => {
          console.log(error)
      });


  }


  render() {
    
    let mensajito;
    if(this.state.completado === 1) {
      mensajito = <Alert severity="success">Venta completada</Alert>
    } else if(this.state.completado === 2) {
      mensajito = <Alert severity="error">Hubo un error con la venta</Alert>
    }
    
    return (
      <div>
        <Card>
          <CardHeader color="primary">
            <h4 style={{ color: "#FFFFFF",marginTop: "0px",minHeight: "auto",fontWeight: "300",fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",marginBottom: "3px",textDecoration: "none"}}>Crear venta</h4>
          </CardHeader>
          <CardBody>
            <Transfer
              dataSource={this.state.mockData}
              showSearch
              pagination
              listStyle={{
                width: 500,
                height: 300,
              }}
              operations={['Incluir', 'Descartar']}
              targetKeys={this.state.targetKeys}
              onChange={this.handleChange}
              render={item => `${item.title}`}
            />
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}>
              <Grid item xs={6}>
                Precio (sin dcto): {this.state.suma}{"\n"}
                Precio final: {this.state.total}
              </Grid>
              <Grid item xs={6}>
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}>
                  <Grid item xs={6}>
                    <TextField id="standard-basic" value={this.state.descuento} label="Descuento %" onChange={this.handleInputChange('descuento')}/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      label="Metodo de pago"
                      value={this.state.metodo_pago}
                      onChange={this.handleInputChange('metodo_pago')}
                      helperText="Selecciona la forma de pagar"
                    >
                      <MenuItem key={'efectivo'} value={'efectivo'}>{'efectivo'}</MenuItem>
                      <MenuItem key={'credito'} value={'credito'}>{'credito'}</MenuItem>
                      <MenuItem key={'debito'} value={'debito'}>{'debito'}</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}>
                  <Grid item xs={6}>
                    <TextField id="standard-basic" value={this.state.vendedor} label="Vendedor" onChange={this.handleInputChange('vendedor')}/>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      label="Sucursal"
                      value={this.state.sucursal}
                      onChange={this.handleInputChange('sucursal')}
                      helperText="Selecciona sucursal"
                    >
                      <MenuItem key={'0'} value={'0'}>{'Lo Castillo'}</MenuItem>
                      <MenuItem key={'1'} value={'1'}>{'Apumanque'}</MenuItem>
                      <MenuItem key={'2'} value={'2'}>{'Vitacura'}</MenuItem>
                    </TextField>
                    </Grid>
                  </Grid>
                <Button style={{ float: 'right', margin: 5 }} onClick={this.imprimir}>
                  Finalizar venta
                </Button>
                {mensajito}
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </div>
    );
  }
}

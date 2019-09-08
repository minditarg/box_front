import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from'../../components/Header/Header';
import axios from 'axios';
import * as actionTypes from '../../store/actions';
import MUIDataTable from "mui-datatables";


const columns = [
  {
    name: 'Nombre',
    selector: 'nombre',
    sortable: true,
  },
  {
    name: 'Apellido',
    selector: 'apellido',
    sortable: true,

  },
];

const columns2 = [
 {
  name: "nombre",
  label: "Nombre",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "username",
  label: "Nombre de usuario",
  options: {
   filter: true,
   sort: false,
  }
 }
];


const textLabels = {
  body: {
    noMatch: 'No se encontraron registros',
    toolTip: 'Ordenar',
  },
  pagination: {
    next: 'Página siguiente',
    previous: 'Página anterior',
    rowsPerPage: 'Registros por página:',
    displayRows: 'of',
  },
  toolbar: {
    search: 'Buscar',
    downloadCsv: 'Descargar CSV',
    print: 'Imprimir',
    viewColumns: 'Ver Columnas',
    filterTable: 'Filtrar',
  },
  filter: {
    all: 'Todos',
    title: 'FILTROS',
    reset: 'RESET',
  },
  viewColumns: {
    title: 'Mostrar Columnas',
    titleAria: 'Mostrar/Ocultar Columnas',
  },
  selectedRows: {
    text: 'Usuario(s) seleccionados',
    delete: 'Eliminar usuario',
    deleteAria: 'Eliminar usuarios seleccionados',
  },
};

const options = {
  filterType: 'checkbox',
  selectableRowsOnClick : 'true',
  textLabels: textLabels

};

class Users extends Component {
  state = {
    users: []

  }

    componentDidMount() {
        if(!this.props.userData.user) {
          axios.get('/me')
          .then(res => {
            if(res.data.success == 1) {
              this.props.onLogin(res.data.user);
            } else if(res.data.success == 3) {
              this.props.history.replace('/');
            }

        })

      }

      axios.get('/list-users-admin')
      .then(res => {
        if(res.data.success == 1) {
            let resultado = [...res.data.result];
            resultado.map(element => {
              element.nombre = element.apellido + ', ' + element.nombre;
              delete element.apellido
            })
            this.setState({
              users: resultado
            })
        }

      })

    }

    handleValue = (event,index) => {
      let newObject = {orderForm: { ...this.state.orderForm }};
      newObject['orderForm'][event.target.name] = event.target.value;
      this.setState(newObject);

    }

    handleSubmit = (event,index) => {
      event.preventDefault();
      axios.post(`/login-json`, { username: event.target.username.value, password:event.target.password.value  })
      .then(res => {

        let estado = null
        if(res.data.success == 0) {
          estado = false
        }
        if(res.data.success == 1) {
          estado = true
          this.props.onLogin(res.data.user.username);
        }

        this.setState({
          orderForm: {
            ...this.state.orderForm,
            password:'',
            successPass:estado
          }
        })

      })

    }




    render () {
        return (
          <div>
          <Header user={ this.props.userData.user } />

     <MUIDataTable
       title={"Usuarios"}
       data={this.state.users}
       columns={columns2}
       options={options}
     />
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (user) => dispatch({type: actionTypes.LOGIN_USER, userData: user}),

    }
}


const mapStateToProps = state => {
    return {
      userData: state
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Users);

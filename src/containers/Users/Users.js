import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from'../../components/Header/Header';
import axios from 'axios';
import * as actionTypes from '../../store/actions';

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

      axios.get('/list-users')
      .then(res => {
        if(res.data.success == 1) {
            let resultado = [...res.data.array_result];
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
          <DataTable
       title="Usuarios"
       columns={columns}
       data={this.state.users}
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

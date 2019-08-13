import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from'../../components/Header/Header';
import axios from 'axios';
import * as actionTypes from '../../store/actions';



class Root extends Component {
    state = {
      orderForm: {
        username: '',
        password:'',
        successPass: null,

      }
    }

    componentDidMount() {
      console.log(this.props.userData)

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
          this.props.onLogin(res.data.user);
        }

        this.setState({
          orderForm: {
            ...this.state.orderForm,
            password:'',
            successPass:estado
          }
        }, () => {
          if(estado)
          this.props.history.push('/users');
        })

      })

    }


    render () {
      let alerta = null
        if(this.state.orderForm.successPass != null && this.state.orderForm.successPass == false) {
          alerta = (
            <div className="alert alert-danger" role="alert">
              El usuario o contraseña son incorrectos
            </div>

          )
        } else if (this.state.orderForm.successPass != null && this.state.orderForm.successPass == true) {
          alerta = (
            <div className="alert alert-success" role="alert">
              usuario y contraseña correcto
            </div>

          )

        }
        return (
          <div>
          <Header user={this.props.userData.user} />
          <form onSubmit={this.handleSubmit}>
          {alerta}
          <div className="form-group">
        <label htmlFor="user">Usuario:</label>
        <input type="text" className="form-control" id="username" name="username" onChange={this.handleValue} value={this.state.orderForm.username} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <input type="password" className="form-control" id="password" name="password" onChange={this.handleValue} value={this.state.orderForm.password} required />
      </div>
      <button className="btn btn-primary" type="submit" >Enviar </button>
      </ form>
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

export default connect(mapStateToProps,mapDispatchToProps)(Root);

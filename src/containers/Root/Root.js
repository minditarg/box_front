import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from'../../components/Header/Header';
import axios from 'axios';
import * as actionTypes from '../../store/actions';
import Input from '../../components/Input/Input';




class Root extends Component {
    state = {

      orderForm: {
          username: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'usuario'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
          },
          password: {
              elementType: 'input',
              elementConfig: {
                  type: 'password',
                  placeholder: 'constraseña'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
          },


        },
        formIsValid: false,
        successPass: null
    }

    componentDidMount() {
      console.log(this.props.userData)

    }

    /*handleValue = (event,index) => {
      let newObject = {orderForm: { ...this.state.orderForm }};
      newObject['orderForm'][event.target.name] = event.target.value;
      this.setState(newObject);

    } */

    handleSubmit = (event,index) => {
      event.preventDefault();
      axios.post(`/login-json`, { username: this.state.orderForm.username.value, password:this.state.orderForm.password.value  })
      .then(res => {

        let estado = null
        if(res.data.success == 0) {
          estado = false
        }
        if(res.data.success == 1) {
          estado = true
          this.props.onLogin(res.data.user);
        }

        let password = {...this.state.orderForm.password };
        password.value = '';


        this.setState({
          orderForm: {
            ... this.state.orderForm,
            password: {
              ... password
            }
          },
          successPass:estado
        }, () => {
          if(estado)
          this.props.history.push('/users');
        })

      })

    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }


    render () {

      const formElementsArray = [];
      for (let key in this.state.orderForm) {
          formElementsArray.push({
              id: key,
              config: this.state.orderForm[key]
          });
      }


      let alerta = null
        if(this.state.successPass != null && this.state.successPass == false) {
          alerta = (
            <div className="alert alert-danger" role="alert">
              El usuario o contraseña son incorrectos
            </div>

          )
        } else if (this.state.successPass != null && this.state.successPass == true) {
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

        { /*  <div className="form-group">
        <label htmlFor="user">Usuario:</label>
        <input type="text" className="form-control" id="username" name="username" onChange={this.handleValue} value={this.state.orderForm.username} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <input type="password" className="form-control" id="password" name="password" onChange={this.handleValue} value={this.state.orderForm.password} required />
      </div>
      */}

      {formElementsArray.map(formElement => (
          <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)} />
      ))}
      <button className="btn btn-primary" disabled={ !this.state.formIsValid } type="submit" >Enviar </button>
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

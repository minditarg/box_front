import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import axios from 'axios';
import * as actionTypes from '../../store/actions';
import ListUsers from './components/listUsers';
import NewUser from './components/newUser';




import Modal from '@material-ui/core/Modal';



class Users extends Component {
  state = {
    users: [],
    checked: [],
    menuContext: null,
    botonesAcciones: {
      nuevo: {

        enabled: true,
        texto: 'Nuevo'
      },
      editar: {

        enabled: false,
        texto: 'Editar'
      },
      delete: {

        enabled: false,
        texto: 'Eliminar'
      }
    },
    modalOpen: false,

    newUserForm: {
      nombre: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              label: 'Nombre',
              fullWidth: true
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'usuario',
                fullWidth: true
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
                label: 'constraseña',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        tipoUser: {
            elementType: 'select',
            elementConfig: {
                label:'Tipo de usuario',
                 options: [
                   {
                     value:1,
                     displayValue:'admin'
                   },
                   {
                     value:2,
                     displayValue:'pañol'
                   }
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required:true
            },

            valid: false,
            touched: false
        },
        descripcion: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: 'descripcion',
                fullWidth: true,
                rows:4
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },


    },
    formIsValid: false



  }

  deleteUser = value => {

    const currentIndex = this.state.users.indexOf(value);
    const newUsers = [...this.state.users];

    newUsers.splice(currentIndex, 1);

    this.setState({
      users: newUsers
    });

  }

  handleToggle = value => {

    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];

    let deleteEnabled = false;
    let editEnabled = false;
    const botonesAcciones = { ...this.state.botonesAcciones }
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }


    if (newChecked.length > 0) {
      deleteEnabled = true;
      if (newChecked.length == 1)
        editEnabled = true;
    }


    botonesAcciones.editar.enabled = editEnabled;
    botonesAcciones.delete.enabled = deleteEnabled;


    this.setState({
      checked: newChecked,
      botonesAcciones: botonesAcciones
    });
  };

  menuHandleClose = (value) => {

    this.setState({
      menuContext: null
    })
  }

  menuHandleItemClick = (value) => {
    const newItem = { ...this.state.botonesAcciones[value] };

    if (this.state.botonesAcciones[value].enabled) {

      this.setState({
        menuContext: null,
      }, () => {
          this.props.history.push('/users/newuser');
        }
      )
    }
  }

  menuHandleOpen = event => {
    this.setState({
      menuContext: event.currentTarget
    })
  }

  modalHandleOpen = () => {
    this.setState({
      modalOpen: true
    });
  };

  modalHandleClose = () => {
    this.setState({
      modalOpen: false
    });
  };

  getUsersAdmin = () => {
    axios.get('/list-users-admin')
      .then(res => {
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
          this.setState({
            users: resultado
          })
        }
      })
  }

  componentDidMount() {

    if (!this.props.userData.user) {
      axios.get('/me')
        .then(res => {
          if (res.data.success == 1) {
            this.props.onLogin(res.data.user);
          } else if (res.data.success == 3) {
            this.props.history.replace('/');
          }

        })

    }

    this.getUsersAdmin();

  }

   handleSubmit = (event, index) => {
        event.preventDefault();
        axios.post(`/login-json`, { username: this.state.orderForm.username.value, password: this.state.orderForm.password.value })
            .then(res => {

                let estado = null
                if (res.data.success == 0) {
                    estado = false
                }
                if (res.data.success == 1) {
                    estado = true
                    this.props.onLogin(res.data.user);
                }

                let password = { ...this.state.orderForm.password };
                password.value = '';


                this.setState({
                    orderForm: {
                        ... this.state.orderForm,
                        password: {
                            ...password
                        }
                    },
                    successPass: estado
                }, () => {
                    if (estado)
                        this.props.history.push('/users');
                })

            })

    }

    checkValidity(value, rules) {
        let isValid = true;
        let textValid = null;

        console.log(value);
        if (rules.required) {
            isValid = value.toString().trim() !== '' && isValid;
            textValid = 'El campo es requerido'
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            textValid = 'No supera la cantidad de caracteres minimos'
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            textValid = 'Supera el maximo de caracteres';
        }

        return {isValid:isValid,textValid:textValid};
    }

    inputChangedHandler = (event, inputIdentifier) => {
        let checkValid;
        const updatedOrderForm = {
            ...this.state.newUserForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        checkValid =  this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValid.isValid;
        updatedFormElement.textValid = checkValid.textValid;
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ newUserForm: updatedOrderForm, formIsValid: formIsValid });
    }






  render() {

    return ([

      <Header key="users-comp-1" user={this.props.userData.user} />
      ,
      <div key="users-comp-2" className="container">
      <Switch>
            <Route path="/users" exact  render={() =>

              <ListUsers
                  menuHandleOpen={(event) => this.menuHandleOpen(event)}
                  menuHandleClose={(event) => this.menuHandleClose(event)}
                  menuHandleItemClick={(keyName) => this.menuHandleItemClick(keyName)}
                  handleToggle={(value) => this.handleToggle(value)}
                  deleteUser={(value) => this.deleteUser(value)}

                  menuContext={this.state.menuContext}
                  botonesAcciones={this.state.botonesAcciones}
                  users={this.state.users}
                  checked={this.state.checked}



              />


            } />
            <Route path="/users/newuser"  render={() =>

             <NewUser
             orderForm={this.state.newUserForm}
             formIsValid={this.state.formIsValid}

             handleSubmit={(event) => this.handleSubmit(event) }
             checkValidity={ (value, rules) => this.checkValidity(value,rules) }
             inputChangedHandler={ (event,inputIdentifier)=> this.inputChangedHandler(event,inputIdentifier)}

             />

            } />
        </Switch>

      </div> ,
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.modalOpen}
        onClose={this.modalHandleClose}
        >
        <div className="modal-user">
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>

        </div>
      </Modal>

    ]

    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (user) => dispatch({ type: actionTypes.LOGIN_USER, userData: user }),

  }
}


const mapStateToProps = state => {
  return {
    userData: state
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

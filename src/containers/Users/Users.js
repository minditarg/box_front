import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import axios from 'axios';
import * as actionTypes from '../../store/actions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

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
    newUser:false,
    prevLocation:'/users'

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
          this.props.history.push('/newuser');
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

  componentDidUpdate() {
      if(this.state.prevLocation != this.props.location.pathname)
      {
        let newUser = false;
        if(this.props.location.pathname == '/newuser')
            newUser = true;

         console.log(newUser);   

          this.setState({
            prevLocation:this.props.location.pathname,
            newUser:newUser

          })
      }        

  }



  render() {

    return ([

      <Header key="users-comp-1" user={this.props.userData.user} />
      ,
      <div key="users-comp-2" className="container">
      { !this.state.newUser && (
        <div className="row  justify-content-center">
          <div className="col-md-7 mt-4 ">
            <Card>
              <CardContent>
                <h4>Usuarios</h4>
                <div style={{ position: 'relative', paddingBottom: '2em' }}>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.menuHandleOpen}
                    className="iconmenu"
                    >
                    <MoreVertIcon />
                  </IconButton>
                </div>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.menuContext}
                  keepMounted
                  open={Boolean(this.state.menuContext)}
                  onClose={this.menuHandleClose}
                  >

                  {Object.keys(this.state.botonesAcciones).map((keyName, i) => (
                    <MenuItem key={'menu-' + keyName} onClick={(event) => { this.menuHandleItemClick(keyName) } }>
                      <ListItemIcon>
                        {keyName == 'nuevo' ? (<AddIcon color={this.state.botonesAcciones[keyName].enabled ? 'inherit' : 'disabled'} />) : keyName == 'editar' ? (<EditIcon color={this.state.botonesAcciones[keyName].enabled ? 'inherit' : 'disabled'} />) : keyName == 'delete' ? (<DeleteIcon color={this.state.botonesAcciones[keyName].enabled ? 'inherit' : 'disabled'} />) : null}
                      </ListItemIcon>
                      <Typography color={this.state.botonesAcciones[keyName].enabled ? 'textPrimary' : 'textSecondary'} variant="inherit">{this.state.botonesAcciones[keyName].texto}</Typography>
                    </MenuItem>
                  ))}


                </Menu>
                <div style={{ clear: 'both', display: 'table' }} />
                <List >
                  {this.state.users.map((value, index) => {
                    const labelId = `checkbox-list-label-${index}`;

                    return (
                      <ListItem key={index} role={undefined} dense button onClick={() => this.handleToggle(value)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={this.state.checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={
                            <React.Fragment>
                              {value.nombre}
                              <Typography
                                component="span"
                                variant="body2"

                                color="textSecondary"
                                >
                                {' - ' + value.tipo_users_desc}
                              </Typography>
                            </React.Fragment>

                          }
                          secondary={
                            <React.Fragment>
                              Username:
                               <Typography
                                component="span"
                                variant="body2"

                                color="textPrimary"
                                >
                                {' ' + value.username}
                              </Typography>

                            </React.Fragment>

                          }
                          />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments" onClick={(event) => { this.deleteUser(value) } }>
                            <CommentIcon />

                          </IconButton>

                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </div>
        </div>
        )}
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

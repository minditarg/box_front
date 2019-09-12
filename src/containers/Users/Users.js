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

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';




class Users extends Component {
  state = {
    users: [],
    checked:[],
    menuContext: null


  }

  deleteUser = value => {

    const currentIndex = this.state.users.indexOf(value);
    const newUsers = [...this.state.users];

    newUsers.splice(currentIndex, 1);

    this.setState({
      users:newUsers
    });

  }

  handleToggle = value => {

      const currentIndex = this.state.checked.indexOf(value);
      const newChecked = [...this.state.checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      this.setState({
        checked:newChecked
      });
    };

  handleClose = () => {
    this.setState({
      menuContext:null
    })
  }

  handleClick = event => {
    this.setState({
      menuContext:event.currentTarget
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

    axios.get('/list-users-admin')
      .then(res => {
        if (res.data.success == 1) {
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






  render() {

    return ([

      <Header key="users-comp-1" user={this.props.userData.user} />
      ,
      <div className="container">
        <div className="row  justify-content-center">
          <div className="col-md-7 mt-4 ">
            <Card>
              <CardContent>
                <h4>Usuarios</h4>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                 <Menu
                   id="simple-menu"
                   anchorEl={this.state.menuContext}
                   keepMounted
                   open={Boolean(this.state.menuContext)}
                   onClose={this.handleClose}
                 >
                   <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                   <MenuItem onClick={this.handleClose}>My account</MenuItem>
                   <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                 </Menu>
                    <List key="users-comp-2" >
                   {this.state.users.map((value,index) => {
                     const labelId = `checkbox-list-label-${index}`;

                     return (
                       <ListItem key={index} role={undefined} dense button onClick={ () => this.handleToggle(value)}>
                          <ListItemIcon>
                              <Checkbox
                                  edge="start"
                                  checked={this.state.checked.indexOf(value) !== -1}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ 'aria-labelledby': labelId }}
                                  />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={ value.username } />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" onClick={ (event) => { this.deleteUser(value) } }>
                                <CommentIcon  />

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
     </div>

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

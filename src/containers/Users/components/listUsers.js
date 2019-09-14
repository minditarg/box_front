import React from 'react';

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


const listUsers = ( props ) =>
{
return (

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
              onClick={props.menuHandleOpen}
              className="iconmenu"
              >
              <MoreVertIcon />
            </IconButton>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={props.menuContext}
            keepMounted
            open={Boolean(props.menuContext)}
            onClose={props.menuHandleClose}
            >

            {Object.keys(props.botonesAcciones).map((keyName, i) => (
              <MenuItem key={'menu-' + keyName} onClick={(event) => { props.menuHandleItemClick(keyName) } }>
                <ListItemIcon>
                  {keyName == 'nuevo' ? (<AddIcon color={props.botonesAcciones[keyName].enabled ? 'inherit' : 'disabled'} />) : keyName == 'editar' ? (<EditIcon color={props.botonesAcciones[keyName].enabled ? 'inherit' : 'disabled'} />) : keyName == 'delete' ? (<DeleteIcon color={props.botonesAcciones[keyName].enabled ? 'inherit' : 'disabled'} />) : null}
                </ListItemIcon>
                <Typography color={props.botonesAcciones[keyName].enabled ? 'textPrimary' : 'textSecondary'} variant="inherit">{props.botonesAcciones[keyName].texto}</Typography>
              </MenuItem>
            ))}


          </Menu>
          <div style={{ clear: 'both', display: 'table' }} />
          <List >
            {props.users.map((value, index) => {
              const labelId = `checkbox-list-label-${index}`;

              return (
                <ListItem key={index} role={undefined} dense button onClick={() => props.handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={props.checked.indexOf(value) !== -1}
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
                          {' - ' + value.desc}
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
                    <IconButton edge="end" aria-label="comments" onClick={(event) => { props.deleteUser(value) } }>
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


)};

export default listUsers;

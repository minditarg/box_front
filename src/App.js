import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Root from'./containers/Root/Root';
import Users from'./containers/Users/Users';
import Stock from'./containers/Stock/Stock';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
   palette: {
        primary: purple,
        secondary: green
      }
    });

class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
          <Switch>          
            <Route path="/" exact component={Root} />
            <Route path="/users"  component={Users} />
            <Route path="/stock"  component={Stock} />
          </Switch>
          </ThemeProvider>

    );
  }
}

export default App;

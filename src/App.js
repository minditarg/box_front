import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Root from'./containers/Root/Root';
import Users from'./containers/Users/Users';

class App extends Component {
  render () {
    return (
          <Switch>
            <Route path="/users" component={Users} />
            <Route path="/" exact component={Root} />
          </Switch>

    );
  }
}

export default App;

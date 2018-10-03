import React, { Component } from 'react';
import {BrowserRouter as Router , Route ,Switch  } from 'react-router-dom';
import { UsernameLogin, PasswordLogin } from './containers/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route component={UsernameLogin} />
        </Switch>
      </Router>
    );
  }
}

export default App;

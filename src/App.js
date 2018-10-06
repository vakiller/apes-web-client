import React, { Component } from 'react';
import {BrowserRouter as Router , Route ,Switch  } from 'react-router-dom';
import { ApesLayout , UsernameLogin, PasswordLogin, KanBan} from './containers/';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact  path="/" component={UsernameLogin} />
          <Route exact  path="/login" component={PasswordLogin} />
          <ApesLayout>
            <Route exact path="/kanban" component={KanBan}/>
          </ApesLayout>
        </Switch>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {BrowserRouter as Router , Route ,Switch  } from 'react-router-dom';
import { ApesLayout , UsernameLogin, PasswordLogin , RegisterUser , KanBan} from './containers/';
const firebase = require('firebase');

class App extends Component {
  constructor(props)
  {
    super(props);
    this.config = {
      apiKey: "AIzaSyAoh10vo1MEIyNvKPHunBAOjLsvIgveYFE",
      authDomain: "apesproject-248af.firebaseapp.com",
      databaseURL: "https://apesproject-248af.firebaseio.com",
      projectId: "apesproject-248af",
      storageBucket: "apesproject-248af.appspot.com",
      messagingSenderId: "753095057440"
    };
    firebase.initializeApp(this.config);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact  path="/" component={UsernameLogin} />
          <Route exact  path="/login" component={PasswordLogin} />
          <Route exact path="/register" component={RegisterUser} />
          <ApesLayout>
            <Route exact path="/kanban" component={KanBan}/>
          </ApesLayout>
        </Switch>
      </Router>
    );
  }
}

export default App;

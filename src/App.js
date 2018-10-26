import React, { Component } from 'react';
import {BrowserRouter as Router , Route ,Switch  } from 'react-router-dom';
import { ApesLayout , UsernameLogin, PasswordLogin , RegisterUser , KanBan, User} from './containers/';
import KanbanDetail from './containers/Kanban/detailBoard';
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
          <Route exact path="/register" component={RegisterUser} />
          <ApesLayout>
            <Route exact path="/user" component={User}/>
            <Route exact path="/kanban" component={KanBan}/>
            <Route exact path="/kanban/:id" component={KanbanDetail}/>
          </ApesLayout>
          <Route path="*"  />
        </Switch>
      </Router>
    );
  }
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Login";
import Profile from "../Profile";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Login />} />
          </Switch>
          <Switch>
            <Route exact path="/profile" render={() => <Profile />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Users from "./component/Users";
import _ from "lodash";
import {
  BrowserRouter as Router,
  Switch,
  // Routes,
  Route,
} from "react-router-dom";
import Profile from "./component/Profile";

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Routes> */}
        <Route path="/" exact component={Users} />
        <Route path="/profile" component={Profile} />
        {/* </Routes> */}
      </Switch>
    </Router>
  );
};

export default App;

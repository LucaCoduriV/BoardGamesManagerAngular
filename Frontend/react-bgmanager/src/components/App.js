import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.css";
import HomePage from "./HomePage";
import HeaderBar from "./HeaderBar/HeaderBar";
import NavBar from "./NavBar/NavBar";
import LoginForm from "./Forms/LoginForm";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <HeaderBar />
          <NavBar />
          <div id="content-wrapper">
            <div id="content-inner-wrapper">
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginForm} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

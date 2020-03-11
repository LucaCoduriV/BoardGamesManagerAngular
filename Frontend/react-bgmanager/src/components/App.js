import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NavBar from "./NavBar/NavBar";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div id="header-nav">
            <div id="search-bar">
              Je suis une barre de recherche mdr
            </div>
            <div id="connection-button">
              <a href="#">Connexion</a>
              <a href="#">Registeurreh</a>
            </div>
            Je suis un header lol
            </div>
          <NavBar />
          <div id="content-wrapper">
            <div id="content-inner-wrapper">
              <Route exact path="/" component={HomePage} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

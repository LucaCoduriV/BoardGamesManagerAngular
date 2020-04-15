import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HeaderBar from "./HeaderBar"

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HeaderBar />
        <Router>
          <Route exact path="/" />
        </Router>
      </div>
    );
  }
}
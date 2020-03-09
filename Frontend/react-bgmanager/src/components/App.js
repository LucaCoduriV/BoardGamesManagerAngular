import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={HomePage} />
        </Router>
      </div>
    );
  }
}

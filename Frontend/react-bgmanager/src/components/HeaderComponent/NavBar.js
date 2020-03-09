import React from "react";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
  render() {
    return (
      <header>
        <ul id="headerButtons">
          <li className="navButton">
            <Link to="/coucou">Home</Link>
          </li>
        </ul>
      </header>
    );
  }
}

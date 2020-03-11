import React from "react";
import { NavLink } from "react-router-dom";
import "./navBar.css";

export default class NavBar extends React.Component {
  render() {
    return (
      <header>
        <ul>
          <li>
            <NavLink exact to="/" activeStyle={{ backgroundColor: "#4caf50", color: "white" }}>
              Home
            </NavLink>
            <NavLink to="/collection" activeStyle={{ backgroundColor: "#4caf50", color: "white" }}>
              Collection
            </NavLink>
            <NavLink to="/survey" activeStyle={{ backgroundColor: "#4caf50", color: "white" }}>
              Survey
            </NavLink>
          </li>
        </ul>
      </header>
    );
  }
}

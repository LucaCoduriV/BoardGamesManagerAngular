import React from "react";
import { NavLink } from "react-router-dom";
import "./navBar.css";

const activeStyle = {
  backgroundColor: "#4caf50",
  color: "white"
};

export default class NavBar extends React.Component {
  render() {
    return (
      <header id="navBar">
        <ul>
          <li>
            <NavLink exact to="/" activeStyle={activeStyle}>
              Home
            </NavLink>
            <NavLink to="/collection" activeStyle={activeStyle}>
              Collection
            </NavLink>
            <NavLink to="/survey" activeStyle={activeStyle}>
              Survey
            </NavLink>
          </li>
        </ul>
      </header>
    );
  }
}

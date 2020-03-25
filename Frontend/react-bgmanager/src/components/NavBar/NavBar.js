import React from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';

const activeStyle = {
  backgroundColor: '#4caf50',
  color: 'white'
};

export default class NavBar extends React.Component {
  handleLoggedIn() {
    if (this.props.isLogged) {
      return (
        <nav>
          <li>
            <NavLink to='/collection' activeStyle={activeStyle}>
              Collection
            </NavLink>
          </li>
          <li>
            <NavLink to='/survey' activeStyle={activeStyle}>
              Survey
            </NavLink>
          </li>
        </nav>
      );
    }
  }

  render() {
    const navBar = (
      <div id='navBar'>
        <ul>
          <li>
            <NavLink exact to='/' activeStyle={activeStyle}>
              Home
            </NavLink>
          </li>
          {this.handleLoggedIn()}
        </ul>
      </div>
    );

    return navBar;
  }
}

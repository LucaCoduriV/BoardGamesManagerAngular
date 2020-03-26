import React from 'react';
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './navBar.css';

const activeStyle = {
  backgroundColor: '#4caf50',
  color: 'white'
};

export default class NavBar extends React.Component {
  handleLoggedIn() {
    if (this.props.isLogged) {
      let token = localStorage.getItem('token');
      let decoded = jwtDecode(token);
      let adminValue = decoded.superadmin;
      return (
        <nav>
          <li>
            <NavLink to='/collection' activeStyle={activeStyle}>
              Ma collection
            </NavLink>
          </li>
          <li>
            <NavLink to='/survey' activeStyle={activeStyle}>
              Sondages
            </NavLink>
          </li>
          {this.isAdmin(adminValue)}
        </nav>
      );
    }
  }

  isAdmin(adminValue) {
    if (adminValue === 1) {
      return (
        <nav>
          <li>
            <NavLink to='/admin' activeStyle={activeStyle}>
              Administration
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
              Accueil
            </NavLink>
          </li>
          {this.handleLoggedIn()}
        </ul>
      </div>
    );

    return navBar;
  }
}

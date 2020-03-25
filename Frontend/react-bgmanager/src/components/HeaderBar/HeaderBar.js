import React from 'react';
import { NavLink } from 'react-router-dom';
import './headerBar.css';

const activeStyle = {
  backgroundColor: '#4caf50',
  color: 'white'
};

export default class HeaderBar extends React.Component {
  handleLoggedin() {
    if (this.props.isLogged) {
      return (
        <div id='header-button-wrapper'>
          <NavLink className='header-button' to='/disconnect'>
            Déconnexion
          </NavLink>
        </div>
      );
    } else {
      return (
        <div id='header-button-wrapper'>
          <NavLink className='header-button' to='/login' activeStyle={activeStyle}>
            Connexion
          </NavLink>
          <NavLink className='header-button' to='/register' activeStyle={activeStyle}>
            Inscription
          </NavLink>
        </div>
      );
    }
  }

  render() {
    return (
      <div id='header-bar'>
        <div id='search-bar'>Je suis une barre de recherche lol</div>
        {this.handleLoggedin()}
      </div>
    );
  }
}

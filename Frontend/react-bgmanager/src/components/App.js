import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './app.css';
import jwtDecode from 'jwt-decode';
import HomePage from './HomePage';
import HeaderBar from './HeaderBar/HeaderBar';
import NavBar from './NavBar/NavBar';
import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';
import Admin from './Admin';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: localStorage.getItem('token') != null,
      isAdmin: this.isAdmin()
    };
  }

  onChangeLoginState(value) {
    this.setState({ isLogged: value });
    this.setState({ isAdmin: this.isAdmin() });
  }

  isAdmin() {
    return this.getRole() === 1;
  }

  getRole() {
    if (localStorage.getItem('token') != null) {
      let token = localStorage.getItem('token');
      let decoded = jwtDecode(token);
      return decoded.superadmin;
    }
    return 0;
  }

  render() {
    return (
      <div className='App'>
        <Router>
          <HeaderBar isLogged={this.state.isLogged} onLogout={this.onChangeLoginState.bind(this)} />
          <NavBar isLogged={this.state.isLogged} />
          <div id='content-wrapper'>
            <div id='content-inner-wrapper'>
              <Route exact path='/' component={HomePage} />
              <Route
                path='/login'
                component={() => <LoginForm onLogin={this.onChangeLoginState.bind(this)} />}
              />
              <Route path='/register' component={RegisterForm} />
              <Route path='/admin'>{this.isAdmin() ? <Admin /> : <Redirect to='/' />}</Route>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

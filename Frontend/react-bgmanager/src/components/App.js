import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';
import HomePage from './HomePage';
import HeaderBar from './HeaderBar/HeaderBar';
import NavBar from './NavBar/NavBar';
import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: localStorage.getItem('token') != null
    };
  }

  onChangeLoginState(value) {
    this.setState({ isLogged: value });
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
              <Route path='/admin'></Route>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

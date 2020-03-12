import React from "react";
import "./loginForm.css";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.username);
    console.log(this.state.password);

    fetch("http://localhost:8081/login", {
      method: "POST",
      body: this.state
    }).then(value => {
      console.log(value);
    });
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      username: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <div id="form-input-text">
          <input name="username" value={this.state.username} type="text" placeholder="Nom d'utilisateur" onChange={this.handleChange} />
          <br />
          <input name="password" value={this.state.password} type="password" placeholder="Mot de passe" onChange={this.handleChange} />
        </div>
        <div>
          <button type="submit">Se connecter</button>
          <button type="reset">Vider les champs</button>
        </div>
      </form>
    );
  }
}

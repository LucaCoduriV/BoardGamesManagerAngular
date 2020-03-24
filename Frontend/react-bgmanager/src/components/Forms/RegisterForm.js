import React from "react";
import "./loginForm.css";

export default class RegisterForm extends React.Component {
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

    let data = {
      username: this.state.username,
      password: this.state.password
    };

    fetch("http://localhost:8081/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data) //WTF ?!?!
    })
      .then(response => {
          if(response.status === 201) {
              console.log("Utilisateur ajouté avec succès")
          }
          else {
              console.log("Erreur, l'utilisateur existe déjà")
          }
      })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value //On attribue au nom de l'input, la valeur qu'il contient
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Inscription</h2>
        <div id="form-input-text">
          <input name="username" type="text" placeholder="Nom d'utilisateur" onChange={this.handleChange} />
          <br />
          <input name="password" type="password" placeholder="Mot de passe" onChange={this.handleChange} />
        </div>
        <div>
          <button type="submit">S'inscrire</button>
          <button type="reset">Vider les champs</button>
        </div>
      </form>
    );
  }
}

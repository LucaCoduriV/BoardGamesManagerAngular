import React from 'react';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.getUsers();
    this.handleClick = this.handleClick.bind(this);
  }

  getUsers() {
    fetch('http://localhost:8081/users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') }
    })
      .then(response => response.json())
      .then(value => {
        this.setState({ users: value });
      });
  }

  handleClick(user) {
    fetch(`http://localhost:8081/users/${user.idUser}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') }
    }).then(() => {
      this.getUsers();
    });
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user.idUser}>
                <td>{user.login}</td>
                <td>
                  <button onClick={() => this.handleClick(user)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

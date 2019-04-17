import React from 'react';
import * as firebase from 'firebase';

class LogInForm extends React.Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      loggedIn: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAuthenticationUpdate() {
    this.setState({ loggedIn: 1 })
  };

  handleInputChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit() {
    console.log("handleLogIn");

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.handleAuthenticationUpdate();
      })
      .catch(function(error) {
        console.log(error.message);
      });
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={this.state.username}
            name="email"
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <button
          type="submit"
        >
          Log In
        </button>
        <h1>{this.state.loggedIn}</h1>
      </form>
    );
  }
}

export default LogInForm;

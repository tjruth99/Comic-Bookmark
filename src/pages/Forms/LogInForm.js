import React from 'react';
import * as firebase from 'firebase';

class LogInForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
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

  handleLogIn() {
    console.log("handleLogIn");

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.handleAuthenticationUpdate();
      })
      .catch(function(error) {
        alert("Error when signing in", error.message)
        console.log(error.message);
      });
  }

  render () {
    return (
      <div
        class="container"
      >
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
          <br /><br />
          <button
            type="button"
            onClick={this.handleLogIn}
          >
            Log In
          </button>
          <h1>{this.state.loggedIn}</h1>
          <h1>{this.props.username}</h1>
        </form>
      </ div>
    );
  }
}

export default LogInForm;

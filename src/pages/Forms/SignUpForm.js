import React from 'react';
import * as firebase from 'firebase';

class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleInputChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSignUp() {
    console.log("handleSignUp");

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("Created Account");
        localStorage.setItem('_userEmail', this.state.email);
      })
      .catch(function(error) {
        alert("Error when creating account: " + error.message)
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
            Username:
            <input
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              value={this.state.email}
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
            onClick={this.handleSignUp}
          >
            Create
          </button>
        </form>
      </ div>
    );
  }
}

export default SignUpForm;

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit() {
    console.log("handleSubmit");

    firebase.auth().createAccountWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log("Created Account");
      })
      .catch(function(error) {
        console.log(error.message);
      });
  }

  render () {
    return (
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
        <br />
        <button
          type="submit"
        >
          Create
        </button>
      </form>
    );
  }
}

export default SignUpForm;

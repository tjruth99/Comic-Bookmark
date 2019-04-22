import React from 'react';
import { Redirect } from 'react-router'
import * as firebase from 'firebase';

class LogInForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",

      redirect: false
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  componentDidMount(){

  }

  handleAuthenticationUpdate() {
    // TODO: get username form database and set local storage

    localStorage.setItem('_userEmail', this.state.email);

    this.setState({
      redirect: true
    })

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

    if(this.state.redirect){
      return <Redirect to='/profile'/>;
    }

    return (
      <div
        class="container"
      >
        <form>
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
            onClick={this.handleLogIn}
          >
            Log In
          </button>
        </form>
      </ div>
    );
  }
}

export default LogInForm;

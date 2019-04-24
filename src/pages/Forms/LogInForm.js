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

    this.getUsernameFromID = this.getUsernameFromID.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  componentDidMount(){

  }

  getUsernameFromID = () => {
    console.log("userID: " + firebase.auth().currentUser.uid);
    fetch(
        "https://us-central1-comicbookmark-970b7.cloudfunctions.net/getUserFromID",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userID: firebase.auth().currentUser.uid
          })
        }
      )
      .then(data => {
        console.log("data: " + data);
        this.setState({
          username: data
        })
        localStorage.setItem('_username', this.state.username);
      })
      .catch(error => console.error(`Error: getUserFromID ${error}`));
  }

  handleAuthenticationUpdate() {
    // TODO: get username form database and set local storage

    localStorage.setItem('_userEmail', this.state.email);
    this.getUsernameFromID();

    this.setState({
      redirect: true
    })

    window.location.reload();

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
        className="container"
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

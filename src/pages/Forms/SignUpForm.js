import React from 'react';
import { Redirect } from 'react-router'
import * as firebase from 'firebase';

class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      userID: "",

      redirect: false
    };

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addUserToDatabase = this.addUserToDatabase.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentDidUpdate(){

  }

  addUserToDatabase = () => {
    console.log("addUserToDatabase");
    console.log("UserID: " + this.state.userID);
    console.log("username: " + this.state.username);
    fetch(
        "https://us-central1-comicbookmark-970b7.cloudfunctions.net/addUserToDatabase",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userID: this.state.userID,
            user: this.state.username
          })
        }
      )
        .then(data => {
          console.log("SUCCESS!?");
        })
        .catch(error => console.error(`Error: addUserToDatabase ${error}`));
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
        localStorage.setItem('_username', this.state.username);
        localStorage.setItem('_userEmail', this.state.email);

        /*
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User logged in already or has just logged in.
            this.setState({ userID: user.uid });
            console.log(user.uid);
          } else {
            // User not logged in or has just logged out.
          }
        });
        */

        this.setState({
          userID: firebase.auth().currentUser.uid,
          redirect: true
        })

        this.addUserToDatabase();
        window.location.reload();
      })
      .catch(function(error) {
        alert("Error when creating account: " + error.message)
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

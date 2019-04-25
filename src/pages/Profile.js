import React from 'react';
import ProfileList from './components/ProfileList'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LogIn from "./LogIn";
import SignUp from "./SignUp";

import * as firebase from 'firebase';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: ""
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount(){
    this.setState({
      username: localStorage.getItem('_username'),
      email: localStorage.getItem('_userEmail')
    })
  }

  signOut(){
    // If, the user is signed in
    console.log("Sign out");
    localStorage.removeItem('_username');
    localStorage.removeItem('_userEmail');
    localStorage.removeItem('_userID');

    this.setState({
      username: "",
      email: ""
    })

    firebase.auth().signOut()
      .then(() => {
        // Do Something
      })
      .catch(function(error) {
        alert("Error when signing out: " + error.message)
        console.log(error.message);
      });

    window.location.reload();
  }

  render () {
    if( this.state.email == null ){
      return (
        <div>
          <h2>Please Sign In</h2>
          <br />
          <Router>
            <Link to="/profile/login">
              <button
                name="loginButton"
                type="button"
                className="authButton"
              >
                Login
              </button>
            </Link>
            <div className="divider" />
            <Link to="/profile/signup">
              <button
                name="signupButton"
                type="button"
                className="authButton"
              >
                Sign-Up
              </button>
            </Link>
            <Route path="/profile/login" component={LogIn} />
            <Route path="/profile/signup" component={SignUp} />
          </ Router>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Profile</h1>
          <h2>Username: {this.state.username}</h2>
          <h2>Email: {this.state.email}</h2>
          <p>
            Display a list of the stories the user is currently reading and have buttons for the user to press to continue or go back on issues
            <br />
            Display the next issue of the story in smaller, dimmed text
          </p>
          <ProfileList />
          <button
            type="button"
            onClick={this.signOut}
          >
            Sign Out
          </button>
        </div>
      );
    }
  }
}

export default Profile

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";


class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <header className="App-header">
          <p>
            <h1>Comic Bookmark</h1>
          </p>
          <div>
            <Link to="/">
              <button
                name="homeButton"
                type="button"
              >
                Home
              </button>
            </Link>
            <div class="divider" />
            <Link to="/login">
              <button
                name="loginButton"
                type="button"
              >
                Login
              </button>
            </Link>
            <div class="divider" />
            <Link to="/signup">
              <button
                name="signupButton"
                type="button"
              >
                Sign-Up
              </button>
            </Link>
            <div class="divider" />
            <Link to="/profile">
              <button
                name="profileButton"
                type="button"
              >
                Profile
              </button>
            </Link>
          </div>
          <br/>
        </header>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile} />
        </div>
        </Router>
      </div>
    );
  }
}

export default App;

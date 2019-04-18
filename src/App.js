import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Comics from "./components/Comics";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";


class App extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      isLogged: 0
    };
  }

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
                class="navButton"
              >
                Home
              </button>
            </Link>
            <div class="divider" />
            <Link to="/comics">
              <button
                name="comicsButton"
                type="button"
                class="navButton"
              >
                Comics
              </button>
            </Link>
            <div class="divider" />
            <Link to="/login">
              <button
                name="loginButton"
                type="button"
                class="navButton"
              >
                Login
              </button>
            </Link>
            <div class="divider" />
            <Link to="/signup">
              <button
                name="signupButton"
                type="button"
                class="navButton"
              >
                Sign-Up
              </button>
            </Link>
            <div class="divider" />
            <Link to="/profile">
              <button
                name="profileButton"
                type="button"
                class="navButton"
              >
                Profile
              </button>
            </Link>
          </div>
          <br/>
        </header>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/comics" component={Comics} />
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

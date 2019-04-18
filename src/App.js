import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "testtesttest",
      isLogged: 0
    };
  }

  render() {
    return (
      <div className="App">
      <Router>
        <header className="App-header">
          <h1>Comic Bookmark</h1>
          <div>
            <Link to="/">
              <button
                name="homeButton"
                type="button"
                className="navButton"
              >
                Home
              </button>
            </Link>
            <div className="divider" />
            <Link to="/comics">
              <button
                name="comicsButton"
                type="button"
                className="navButton"
              >
                Comics
              </button>
            </Link>
            <div className="divider" />
            <Link to="/login">
              <button
                name="loginButton"
                type="button"
                className="navButton"
              >
                Login
              </button>
            </Link>
            <div className="divider" />
            <Link to="/signup">
              <button
                name="signupButton"
                type="button"
                className="navButton"
              >
                Sign-Up
              </button>
            </Link>
            <div className="divider" />
            <Link to="/profile">
              <button
                name="profileButton"
                type="button"
                className="navButton"
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

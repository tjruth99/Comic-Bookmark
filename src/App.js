import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <h1>Welcome to Comic Bookmark</h1>
            <h3>Follow the whole story</h3>
          </p>
          <div>
            <button
              name="loginButton"
              class="auth"
              type="button"
            >
              Login
            </button>
            <div class="divider"/>
            <button
              name="signupButton"
              class="auth"
              type="button"
            >
              Sign-Up
            </button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDFtVfjj31koxhQww3kKKca_B7fsHgLycY",
  authDomain: "comicbookmark-970b7.firebaseapp.com",
  databaseURL: "https://comicbookmark-970b7.firebaseio.com",
  projectId: "comicbookmark-970b7",
  storageBucket: "comicbookmark-970b7.appspot.com",
  messagingSenderId: "299485631413"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

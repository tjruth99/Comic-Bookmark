import React from 'react';
import * as firebase from 'firebase';

export default class ComicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",

      comicList: []
    };

    this.getComics = this.getComics.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this);
    this.startReading = this.startReading.bind(this);

    this.listElement = this.listElement.bind(this);
  }

  componentDidMount(){
    this.setState({
      username: localStorage.getItem('_username'),
      email: localStorage.getItem('_userEmail')
    })

    this.getComics();
  }

  async getComics(){
    let data = await fetch(
      "https://us-central1-comicbookmark-970b7.cloudfunctions.net/getComics",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
      });

    data = await data.json();

    console.log("data: " + JSON.stringify(data));

    this.setState({
      comicList: data.map((data) => (this.listElement(data.seriesName, data.numIssues)))
    })
  }

  startReading = (seriesName, numIssues) => {
    if( this.state.email === null ){
      alert("You are not signed in");
    } else {
      console.log("startReading start");
      console.log("userID: " + firebase.auth().currentUser.uid);
      console.log("seriesName: " + seriesName);
      fetch(
          "https://us-central1-comicbookmark-970b7.cloudfunctions.net/startReading",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userID: firebase.auth().currentUser.uid,
              seriesName: seriesName,
              numIssues: numIssues
            })
          }
        )
        .then(data => {
          console.log("startReading end");
        })
        .catch(error => console.error(`Error: startReading ${error}`));
    }
  }


  listElement(name, issues) {
    return (
      <div>
        <div className="comicList">
          <h2>{name}</h2>
          <h4>{issues} issues</h4>
          <button
            type="button"
            onClick={() => this.startReading(name, issues)}
          >
            Start Reading
          </button>
        </div>
        <br />
      </div>
    );
  }

  render() {
    return(
      <div>{this.state.comicList}</div>
    );
  }
}

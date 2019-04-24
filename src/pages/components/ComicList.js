import React from 'react';
import * as firebase from 'firebase';

export default class ComicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: ""
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.startReading = this.startReading.bind(this);

    this.listElement = this.listElement.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount(){
    this.setState({
      username: localStorage.getItem('_username'),
      email: localStorage.getItem('_userEmail')
    })
  }

  startReading = (seriesName) => {
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
              seriesName: seriesName
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
            onClick={() => this.startReading(name)}
          >
            Start Reading
          </button>
        </div>
        <br />
      </div>
    );
  }

  renderList() {
    // TODO: Create a firebase function to get all comics from the database and put them in an Array
    // Use that to create this list

    var sampleList = ['List 1', 'List 2', 'List 3'];
    var issues = 33;
    let list = [];
    for(var i = 0; i < sampleList.length; i++){
      list.push(this.listElement(sampleList[i], issues));
    }
    return list;
  }

  render() {
    return(
      <div>{this.renderList()}</div>
    );
  }
}

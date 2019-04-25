import React from 'react';
import * as firebase from 'firebase';

export default class ProfileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      userID: "",

      comicList: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);

    this.getUserReadings = this.getUserReadings.bind(this);
    this.getIssueFromSeries = this.getIssueFromSeries.bind(this);
    this.listElement = this.listElement.bind(this);
    this.renderList = this.renderList.bind(this);
    this.getIssue = this.getIssue.bind(this);
  }

  componentDidMount(){
    let id;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("inside onauthchanged");
        console.log(firebase.auth().currentUser.uid);
        id = firebase.auth().currentUser.uid;
        this.setState({
          userID: firebase.auth().currentUser.uid
        });
        this.getUserReadings();
      } else {
        // No user is signed in.
      }
    }.bind(this));

    console.log("var: " + this.state.userID);
  }

  async getUserReadings(){
    try{
      console.log("getUserReadings");
      console.log("userID: " + this.state.userID);
      let data = await fetch(
        "https://us-central1-comicbookmark-970b7.cloudfunctions.net/getUserReadings",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userID: this.state.userID
          })
        });

      data = await data.json();

      console.log("data: " + JSON.stringify(data));

      for( var i = 0; i < data.length; i++){
        data[i].issueName =  await this.getIssueFromSeries(data[i].seriesName, data[i].currentIssue);
      }

      console.log("data: " + JSON.stringify(data));

      this.setState({
        comicList: data.map((data) => (this.listElement(data.seriesName, data.currentIssue, data.numIssues, data.issueName)))
      })
    } catch (err){
      console.error(`Error: getUserReadings ${err}`);
    }
  }

  getIssue(serieName, issueNumber){
    return this.getIssueFromSeries(serieName, issueNumber);
  }

  async getIssueFromSeries(seriesName, issueNumber) {
    var issueName;
    console.log("getIssueFromSeries");
    console.log("seriesName: " + seriesName);
    console.log("issueNumber: " + issueNumber);
    let data = await fetch(
        "https://us-central1-comicbookmark-970b7.cloudfunctions.net/getIssueFromSeries",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            seriesName: seriesName,
            issueNumber: issueNumber
          })
        }
      );

    data = await data.json();

    issueName = data.issues[issueNumber];
    console.log("issueName: " + issueName);

    return issueName;
  }

  prevIssue(seriesName) {
    console.log("prevIssue");
    console.log("userID: " + firebase.auth().currentUser.uid);
    console.log("seriesName: " + seriesName);
    fetch(
        "https://us-central1-comicbookmark-970b7.cloudfunctions.net/prevIssue",
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
        console.log("prevIssue end");
        window.location.reload();
      })
      .catch(error => console.error(`Error: prevIssue ${error}`));
    window.location.reload();
  }

  nextIssue(seriesName) {
    console.log("nextIssue");
    console.log("userID: " + firebase.auth().currentUser.uid);
    console.log("seriesName: " + seriesName);
    fetch(
        "https://us-central1-comicbookmark-970b7.cloudfunctions.net/nextIssue",
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
        console.log("nextIssue end");
        window.location.reload();
      })
      .catch(error => console.error(`Error: nextIssue ${error}`));

  }

  listElement(seriesName, currentIssue, numIssues, issueName) {
    return (
      <div>
        <div className="comicList">
          <h2>{seriesName}</h2>
          <h4>{currentIssue + 1} / {numIssues} issues</h4>
          <p>{issueName}</p>
          <button
            type="button"
            onClick={() => this.prevIssue(seriesName, currentIssue)}
          >
            Prev Issue
          </button>
          <div className="divider" />
          <button
            type="button"
            onClick={() => this.nextIssue(seriesName, currentIssue)}
          >
            Next Issue
          </button>
        </div>
        <br />
      </div>
    );
  }

  renderList() {
    // TODO: Create a firebase function to get all comics from the database and put them in an Array
    // Use that to create this list
/*
    var sampleList = ['List 1', 'List 2', 'Series 3'];
    var issues = ['33', '20', '120'];
    let list = [];
    for(var i = 0; i < sampleList.length; i++){
      list.push(this.listElement(sampleList[i], 1, issues[i]));
    }
    return list;
*/
  }

  render() {
    return(
      <div>{this.state.comicList}</div>
    );
  }
}

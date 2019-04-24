import React from 'react';
import * as firebase from 'firebase';

export default class ProfileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: ""
    };

    this.componentDidMount = this.componentDidMount.bind(this);

    this.listElement = this.listElement.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount(){
    this.setState({
      username: localStorage.getItem('_username'),
      email: localStorage.getItem('_userEmail')
    })
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
      })
      .catch(error => console.error(`Error: prevIssue ${error}`));
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
        console.log("prevIssue end");
      })
      .catch(error => console.error(`Error: nextIssue ${error}`));
  }

  listElement(name, curIssueNum, issue) {
    return (
      <div>
        <div className="comicList">
          <h2>{name}</h2>
          <h4>{curIssueNum} / {issue} issues</h4>
          <p>Current Issue: Issue #1</p>
          <button
            type="button"
            onClick={() => this.prevIssue(name, curIssueNum)}
          >
            Prev Issue
          </button>
          <div className="divider" />
          <button
            type="button"
            onClick={() => this.nextIssue(name, curIssueNum)}
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

    var sampleList = ['List 1', 'List 2', 'Series 3'];
    var issues = ['33', '20', '120'];
    let list = [];
    for(var i = 0; i < sampleList.length; i++){
      list.push(this.listElement(sampleList[i], 1, issues[i]));
    }
    return list;
  }

  render() {
    return(
      <div>{this.renderList()}</div>
    );
  }
}

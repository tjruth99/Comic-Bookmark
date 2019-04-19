import React from 'react';

export default class ProfileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.listElement = this.listElement.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  prevIssue(name, curIssueNum) {
    // TODO Decrement the cur issue, update the page and database
    console.log("prevIssue " + name + " " + curIssueNum);
  }

  nextIssue(name, curIssueNum) {
    // TODO Increment the cur issue, update the page and database
    console.log("prevIssue " + name + " " + curIssueNum);
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

    var sampleList = ['Series 1', 'Series 2', 'Series 3'];
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

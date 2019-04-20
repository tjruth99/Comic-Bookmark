import React from 'react';

export default class HomeList extends React.Component {
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

  listElement(username, name, curIssueNum, issues) {
    return (
      <div>
        <div className="comicList">
          <h3>{username} is reading:</h3>
          <h2>{name}</h2>
          <h4>{curIssueNum} / {issues} issues</h4>
          <p>Current Issue: Issue #1</p>
        </div>
        <br />
      </div>
    );
  }

  renderList() {
    // TODO: Create a firebase function to get all comics from the database and put them in an Array
    // Use that to create this list

    var sampleList = ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'];
    var issues = ['33', '20', '120', '3', '10'];
    let list = [];
    for(var i = 0; i < sampleList.length; i++){
      list.push(this.listElement("Username", sampleList[i], 1, issues[i]));
    }
    return list;
  }

  render() {
    return(
      <div>{this.renderList()}</div>
    );
  }
}

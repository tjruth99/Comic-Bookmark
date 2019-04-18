import React from 'react';

export default class ComicList extends React.Component {
  constructor(props) {
    super(props);

    this.startReading = this.startReading.bind(this);
    this.listElement = this.listElement.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  startReading(name) {
    // Add the current comic book to the user's database to start Reading
    alert("test");
    console.log("Start Reading:");
    console.log(name);
  }

  listElement(name, issues) {
    return (
      <div>
        <div className="comicList">
          <h2>{name}</h2>
          <h4>{issues} issues</h4>
          <button type="button" onClick={this.startReading(name)}>Start Reading</button>
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

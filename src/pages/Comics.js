import React from 'react';
import ComicList from './components/ComicList';

class Comics extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div>
        <h1>Comics</h1>
        <p>
          Display a list of comic book stoires for the user to start reading
        </p>
        <ComicList />
      </div>
    );
  }
}

export default Comics

import React from 'react';
import ComicList from './components/ComicList';

class Comics extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      email: ""
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    this.setState({
      username: localStorage.getItem('_username'),
      email: localStorage.getItem('_userEmail')
    })
  }
  render () {
    return (
      <div>
        <h1>Comics</h1>
        <p>
          Select a comic to start reading:
        </p>
        <ComicList />
      </div>
    );
  }
}

export default Comics

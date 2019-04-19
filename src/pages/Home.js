import React from 'react';
import HomeList from './components/HomeList'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div>
        <h1>Home Page</h1>
        <p>
          Display a list of users and what stories they are currently reading and what issue they are on
        </p>
        <HomeList />
      </div>
    );
  }
}

export default Home

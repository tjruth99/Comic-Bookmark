import React from 'react';
import LogInForm from './Forms/LogInForm'

class LogIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <LogInForm />
      </div>
    );
  }
}

export default LogIn

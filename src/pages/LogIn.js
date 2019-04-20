import React from 'react';
import LogInForm from './Forms/LogInForm'

class LogIn extends React.Component {
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
        <h1>Login</h1>
        <LogInForm />
      </div>
    );
  }
}

export default LogIn

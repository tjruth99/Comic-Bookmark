import React from 'react';
import SignUpForm from './Forms/SignUpForm';

class SignUp extends React.Component {
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
        <h1>SignUp</h1>
        <SignUpForm />
      </div>
    );
  }
}

export default SignUp

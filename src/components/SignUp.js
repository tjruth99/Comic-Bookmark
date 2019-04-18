import React from 'react';
import SignUpForm from './Forms/SignUpForm';

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
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

import React from 'react'
import LoginForm from './LoginForm';

export default class Login extends React.Component{

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="Login">
        <LoginForm></LoginForm>
        <br></br>
      </div>
    );
  }
  
}
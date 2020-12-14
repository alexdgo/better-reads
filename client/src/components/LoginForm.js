import React from "react";
import { Form } from 'react-bootstrap';
import { Wrapper, StyledButton } from '../style/LoginStyle'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleRegister(event) {
    if (this.state.email && this.state.password) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        }),
      };
      const response = await fetch(
        "http://localhost:8081/userRegister/",
        requestOptions
      ).then(async (resx) => {
        console.log(resx);
        resx.json().then(async (res) => {
          console.log(res);
          if (res.status === "false") {
            alert("error");
          } else {
            alert("A verification email has been sent!");
          }
        });
      });
    } else {
      alert("All fields are required!");
    }
  }

  async handleLogin(event) {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        }),
      };
      const response = await fetch(
        "http://localhost:8081/userLogin/",
        requestOptions
      ).then(async (resx) => {
        resx.json().then(async (res) => {
          console.log(res);
          if (res.status === "false") {
            alert("non");
          } else {
            alert("logged!");
            window.sessionStorage.setItem("username", this.state.username);
            window.location.assign("/profile");
          }
        });
      });
    } else {
      alert("All fields are required!");
    }
  }

  render() {
    return (
      <Wrapper>
        <h2 className="LoginForm-title">Login</h2>
        <Form onSubmit={this.handleLogin}>
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
          <Form.Control
            type="text"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <StyledButton
            className="LoginForm-loginbutton"
            type="submit"
            value="Login"
          >
            Log In
          </StyledButton>
        </Form>
        <StyledButton
          type="submit"
          value="Register"
          onClick={() => this.handleRegister()}
        >
          Register
        </StyledButton>
      </Wrapper>
    );
  }
}

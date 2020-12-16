/*
Accounts lmd to aigc to cmrp taken
*/

import React from "react";
import "../style/Login.css";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "",
      name: "",
      username: "",
      password: "",
      location: "",
      age: "",
    };

    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ mode: "Login" });
  }

  async handleModeChange() {
    if (this.state.mode == "Login") {
      this.setState({ mode: "Register" });
    } else if (this.state.mode == "Register") {
      this.setState({ mode: "Login" });
    }
    this.setState({
      name: "",
      username: "",
      password: "",
      location: "",
      age: "",
    });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleAgeChange(event) {
    this.setState({ age: event.target.value });
  }

  async handleSubmit() {
    if (this.state.mode == "Register") {
      if (
        this.state.name &&
        this.state.username &&
        this.state.password &&
        this.state.location &&
        this.state.age
      ) {
        if (isNaN(this.state.age)) {
          alert(`"${this.state.age}" is not a valid age.`);
        } else if (!this.state.username.match(/^[a-zA-Z0-9]+$/)) {
          alert(`Please enter an alphanumeric username.`);
        } else if (this.state.username.length > 20) {
          alert(`Please enter a username shorter than 20 characters.`);
        } else {
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: this.state.name,
              username: this.state.username,
              password: this.state.password,
              location: this.state.location,
              age: this.state.age,
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
                alert("Username already exists.");
              } else {
                alert("Account created! Try logging in.");
                this.handleModeChange();
              }
            });
          });
        }
      } else {
        alert("All fields are required!");
      }
    } else if ((this.state.mode = "Login")) {
      if (this.state.username && this.state.password) {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username: this.state.username,
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
              alert("Incorrect login info.");
            } else {
              alert("Logged!");
              window.sessionStorage.setItem("user_id", res.user_id);
              window.sessionStorage.setItem("username", res.username);
              window.sessionStorage.setItem("location", res.location);
              window.sessionStorage.setItem("age", res.age);
              window.location.assign("/profile");
            }
          });
        });
      } else {
        alert("All fields are required!");
      }
    }
  }

  render() {
    var modeText =
      this.state.mode == "Login"
        ? "Don't have an account? Register here."
        : "Already have an account? Login here.";
    return (
      <div className="LoginPage">
        <div className="LoginForm">
          <h2 className="LoginForm-title">{this.state.mode}</h2>
          <br></br>
          <form>
            {this.state.mode == "Register" && (
              <input
                id="LoginForm-input"
                className="LoginForm-elt"
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            )}
            {this.state.mode == "Register" && <br></br>}
            <input
              id="LoginForm-input"
              className="LoginForm-elt"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <br></br>
            <input
              id="LoginForm-input"
              className="LoginForm-elt"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <br></br>
            {this.state.mode == "Register" && (
              <input
                id="LoginForm-input"
                className="LoginForm-elt"
                type="text"
                name="location"
                placeholder="Location"
                value={this.state.location}
                onChange={this.handleLocationChange}
              />
            )}
            {this.state.mode == "Register" && <br></br>}
            {this.state.mode == "Register" && (
              <input
                id="LoginForm-input"
                className="LoginForm-elt"
                type="text"
                name="age"
                placeholder="Age"
                value={this.state.age}
                onChange={this.handleAgeChange}
              />
            )}
            {this.state.mode == "Register" && <br></br>}
          </form>
          <button
            id="LoginForm-button"
            className="LoginForm-elt"
            type="button"
            onClick={() => this.handleSubmit()}
          >
            {this.state.mode.toUpperCase()}
          </button>
          <br></br>
          <button
            id="LoginForm-button"
            className="LoginForm-elt"
            type="button"
            onClick={() => this.handleModeChange()}
          >
            {modeText}
          </button>
        </div>
      </div>
    );
  }
}

export function redirectLogin() {
  if (window.sessionStorage.getItem("username") == null) {
    window.location.assign("/");
  }
}

import React from "react";
import "../style/Login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "",
      username: "",
      password: "",
      location: "",
      age: "",
      status: "",
    };

    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(window.localStorage.getItem("user_id"));
    this.setState({ mode: "Login" });
  }

  async handleModeChange() {
    if (this.state.mode === "Login") {
      this.setState({ mode: "Register" });
    } else if (this.state.mode === "Register") {
      this.setState({ mode: "Login" });
    }
    this.setState({
      username: "",
      password: "",
      location: "",
      age: "",
      status: "",
    });
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
    if (this.state.mode === "Register") {
      if (
        this.state.username &&
        this.state.password &&
        this.state.location &&
        this.state.age
      ) {
        if (isNaN(this.state.age)) {
          this.setState({ status: `"${this.state.age}" is not a valid age.` });
        } else if (!this.state.username.match(/^[a-zA-Z0-9]+$/)) {
          this.setState({ status: "Please enter an alphanumeric username." });
        } else if (this.state.username.length > 20) {
          this.setState({
            status: "Please enter a username shorter than 20 characters.",
          });
        } else {
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              location: this.state.location,
              age: this.state.age,
            }),
          };
          await fetch(
            "http://localhost:8081/userRegister/",
            requestOptions
          ).then(async (resx) => {
            console.log(resx);
            resx.json().then(async (res) => {
              console.log(res);
              if (res.status === "false") {
                this.setState({ status: "Username already exists." });
              } else {
                this.handleModeChange();
                this.setState({ status: "Account created! Try logging in." });
              }
            });
          });
        }
      } else {
        this.setState({ status: "All fields required!" });
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
        await fetch("http://localhost:8081/userLogin/", requestOptions).then(
          async (resx) => {
            resx.json().then(async (res) => {
              console.log(res);
              if (res.status === "false") {
                this.setState({
                  status: "Incorrect username and/or password.",
                });
              } else {
                console.log(res);
                window.localStorage.setItem(
                  "user_id",
                  JSON.stringify(res.user_id)
                );
                window.localStorage.setItem(
                  "username",
                  JSON.stringify(res.username)
                );
                window.localStorage.setItem(
                  "location",
                  JSON.stringify(res.location)
                );
                window.localStorage.setItem("age", JSON.stringify(res.age));
                window.location.assign("/home");
              }
            });
          }
        );
      } else {
        this.setState({ status: "Incorrect username and/or password." });
      }
    }
  }

  render() {
    var modeText =
      this.state.mode === "Login"
        ? "Don't have an account? Register here."
        : "Already have an account? Login here.";
    return (
      <div className="LoginPage">
        <div className="LoginForm">
          <h2 className="LoginForm-title">{this.state.mode}</h2>
          <br></br>
          {this.state.status !== "" && <p id="status">{this.state.status}</p>}
          <form>
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
            {this.state.mode === "Register" && (
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
            {this.state.mode === "Register" && <br></br>}
            {this.state.mode === "Register" && (
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
            {this.state.mode === "Register" && <br></br>}
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

export function logout() {
  window.localStorage.clear();
  window.location.assign("/");
}

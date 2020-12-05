import React from "react";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readBooks: [],
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: window.sessionStorage.getItem("username"),
      }),
    };
    fetch("http://localhost:8081/userBooks/", requestOptions).then(
      async (resx) => {
        resx.json().then(async (res) => {
          console.log(res);
          if (res.status === "false") {
            alert("error");
          } else {
            this.setState({ readBooks: res.books });
          }
        });
      }
    );
  }

  render() {
    return (
      <div>
        <h2>My book</h2>
        <div>{this.state.readBooks}</div>
      </div>
    );
  }
}

import React from "react";
import PageNavBar from './PageNavbar'
import { Wrapper } from '../style/shared'
import { BookCard } from '../style/SearchStyle'

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
        userid: window.sessionStorage.getItem("user_id"),
      }),
    };
    fetch("http://localhost:8081/userBooks/", requestOptions).then(
      async (resx) => {
        resx.json().then(async (res) => {
          console.log(res);
          if (res.status === "false") {
            alert("error");
          } else {
            this.setState({ readBooks: res });
          }
        });
      }
    );
  }

  render() {
    return (
      <>
      <PageNavBar/>
      <Wrapper>
        <h2>My book</h2>
        {console.log(this.state.readBooks)}
        {this.state.readBooks.map(b => (
          <BookCard {...b}/>
        ))}
      </Wrapper>
      </>
    );
  }
}

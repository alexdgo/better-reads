import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { logout } from "./Login";
import "../style/PageNavbar.css";

export default class PageNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookName: "",
      navDivs: [],
    };
  }

  componentDidMount() {
    const pageList = ["home", "recommendations", "profile"];

    let navbarDivs = pageList.map((page, i) => {
      if (this.props.active === page) {
        return (
          <a className="nav-item nav-link active" key={i} href={"/" + page}>
            {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
          </a>
        );
      } else {
        return (
          <a className="nav-item nav-link" key={i} href={"/" + page}>
            {page.charAt(0).toUpperCase() + page.substring(1, page.length)}
          </a>
        );
      }
    });

    this.setState({
      navDivs: navbarDivs,
    });
  }

  render() {
    return (
      <>
        <div className="PageNavbar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand center">Better Reads</span>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">{this.state.navDivs}</div>
              <SearchBar />
              <button id="logoutButton" type="button" onClick={() => logout()}>
                Logout
              </button>
            </div>
          </nav>
        </div>
        <SearchResult />
      </>
    );
  }
}

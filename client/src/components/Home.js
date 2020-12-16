import React from "react";
import "../style/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "./PageNavbar";
import GenreButton from "./GenreButton";
import DashboardBookRow from "./DashboardBookRow";
import { redirectLogin } from "./LoginForm";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of books for a specified genre.
    this.state = {
      genres: [],
      books: [],
    };

    this.showBooks = this.showBooks.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres", {
      method: "GET", // The type of HTTP request.
    })
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((genreList) => {
        if (!genreList) return;
        // Map each genreObj in genreList to an HTML element:
        // A button which triggers the showMovies function for each genre.
        let genreDivs = genreList.map((genreObj, i) => (
          <GenreButton
            id={"button-" + genreObj.genre}
            onClick={() => this.showBooks(genreObj.genre)}
            genre={genreObj.genre}
          />
        ));
        // this.showBooks();
        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          genres: genreDivs,
        });
      })
      .catch((err) => console.log(err)); // Print the error if there is one.
  }

  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showBooks(genre) {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres/" + genre, {
      method: "GET", // The type of HTTP request.
    })
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((bookList) => {
        if (!bookList) return;
        console.log(bookList);
        // Map each genreObj in genreList to an HTML element:
        // A button which triggers the showMovies function for each genre.
        let bookDivs = bookList.map((bookObj, i) => (
          //   <DashboardBookGrid rows={bookRows}/>
          <DashboardBookRow
            id={"row-" + bookObj.title + bookObj.rating}
            book={bookObj}
          />
        ));

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          books: bookDivs,
        });
      })
      .catch((err) => console.log(err)); // Print the error if there is one.
  }

  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="home" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Top Books</div>
            <div className="genres-container">{this.state.genres}</div>
          </div>

          <br />
          <div className="jumbotron">
            <div className="movies-container">
              <div className="results-container" id="results">
                <div class="row">{this.state.books}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

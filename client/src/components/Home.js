import React from "react";
import "../style/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "./PageNavbar";
import GenreButton from "./GenreButton";
import { BookIcon } from "./BookIcon";
import placeholder from "../files/placeholder.png";

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
            id={"button-" + genreObj.GENRE}
            onClick={() => this.showBooks(genreObj.GENRE)}
            genre={genreObj.GENRE}
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
        //let bookDivs = bookList.map((bookObj, i) =>

        // <DashboardBookRow id={"row-" + bookObj.title + bookObj.rating} book={bookObj}/>
        // );
        const recs = bookList.map((book) => {
          const authorTrimmed = book.AUTHOR.includes("/")
            ? book.AUTHOR.slice(0, book.AUTHOR.indexOf("/"))
            : book.AUTHOR;
          const b = {
            isbn: book.ISBN,
            title: book.TITLE,
            author: authorTrimmed,
            genre: book.GENRE,
            language: book.LANGUAGE,
            cover: book.COVER || placeholder,
            publisher: book.PUBLISHER,
            year_published:
              book.YEAR_PUBLISHED && parseInt(book.YEAR_PUBLISHED),
            price: book.PRICE,
            num_pages: book.NUM_PAGES,
          };
          return <BookIcon {...b} />;
        });
        this.setState({ books: recs });

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        // this.setState({
        //     books: bookDivs
        // })
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
                {/* <Carousel > */}
                <div className="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">{this.state.books}</div>
                </div>
                {/* </Carousel> */}
                {/* <div class="row">{this.state.books}</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

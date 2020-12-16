import React, { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Book from "./Book";
import SearchResult from "./SearchResult";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./SearchBar";
import PageNavbar from "./PageNavbar";

export const BookContext = createContext();

function App() {
  const [queryResult, setQueryResult] = useState([]);
  const [showResult, setShowResult] = useState(false);

  function isLoggedOn() {
    console.log(window.localStorage.getItem("user_id"));
    console.log(window.localStorage.getItem("user_id") == null);
    return !(window.localStorage.getItem("user_id") === null);
  }

  return (
    <BookContext.Provider
      value={{ queryResult, setQueryResult, showResult, setShowResult }}
    >
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              {isLoggedOn() ? <Redirect to="/home" /> : <Login />}{" "}
            </Route>
            <Route exact path="/profile">
              {isLoggedOn() ? <Profile /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/home">
              {isLoggedOn() ? <Home /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/profile">
              {isLoggedOn() ? <Profile /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/book/:isbn">
              {isLoggedOn() ? <Book /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/SearchResult">
              {isLoggedOn() ? <SearchResult /> : <Redirect to="/" />}
            </Route>
            <Route path="/">{<div>This isn't a valid page</div>}</Route>
          </Switch>
        </Router>
      </div>
    </BookContext.Provider>
  );
}

export default App;

import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
  return (
    <BookContext.Provider
      value={{ queryResult, setQueryResult, showResult, setShowResult }}
    >
      <div className="App">
        <PageNavbar/>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Login />} />
            <Route exact path="/profile" render={() => <Profile />} />
            <Route exact path="/home" render={() => <Home />} />
            <Route exact path="/book/:isbn" render={() => <Book />} />
            <Route exact path="/SearchResult" render={() => <SearchResult />} />
          </Switch>
        </Router>
      </div>
    </BookContext.Provider>
  );
}

export default App;

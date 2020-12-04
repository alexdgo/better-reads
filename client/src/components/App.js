import React, { useState, createContext } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Book from './Book';
import SearchResult from './SearchResult'

export const BookContext = createContext()

function App() {
	const [queryResult, setQueryResult] = useState([])
	const [showResult, setShowResult] = useState(false)
	return (
		<BookContext.Provider value = {{ queryResult, setQueryResult, showResult, setShowResult }}>
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact path="/book"
							render={() => (
								<Book />
							)}
						/>
						<Route
							exact path="/SearchResult"
							render={() => (
								<SearchResult />
							)}
						/>
					</Switch>
				</Router>
			</div>
		</BookContext.Provider>
	)
}

export default App
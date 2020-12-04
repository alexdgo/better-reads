import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Book from './Book';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Home />
							)}
						/>
						<Route
							exact
							path="/book/:isbn"
							render={() => (
								<Book />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Book from './Book';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/book"
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
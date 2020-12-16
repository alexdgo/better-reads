import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PageNavbar from './PageNavbar';
import placeholder from '../files/placeholder.png';
import { BookIcon } from './BookIcon';

class UserRec extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: window.localStorage.getItem('user_id'),
			ageRecs: [],
			locRecs: [],
		};

		console.log('USER ', this.state.user);
	}

	componentDidMount() {
		this.getLocRec();
		this.getAgeRec();
	}

	getLocRec() {
		fetch('http://localhost:8081/locationRec/' + this.state.user, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((books) => {
				if (!books) return;
				const recs = books.map((book) => {
					const b = {
						isbn: book.ISBN,
						title: book.TITLE,
						author: book.AUTHOR,
						genre: book.GENRE,
						language: book.LANGUAGE,
						cover: book.COVER || placeholder,
						publisher: book.PUBLISHER,
						year_published: book.YEAR_PUBLISHED && parseInt(book.YEAR_PUBLISHED),
						price: book.PRICE,
						num_pages: book.NUM_PAGES,
					};
					return <BookIcon {...b} />;
				});
				this.setState({ locRecs: recs });
			})
			.catch((err) => console.log(err));
	}

	getAgeRec() {
		fetch('http://localhost:8081/ageRec/' + this.state.user, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((books) => {
				if (!books) return;
				const recs = books.map((book) => {
					const b = {
						isbn: book.ISBN,
						title: book.TITLE,
						author: book.AUTHOR,
						genre: book.GENRE,
						language: book.LANGUAGE,
						cover: book.COVER || placeholder,
						publisher: book.PUBLISHER,
						year_published: book.YEAR_PUBLISHED && parseInt(book.YEAR_PUBLISHED),
						price: book.PRICE,
						num_pages: book.NUM_PAGES,
					};
					return <BookIcon {...b} />;
				});
				this.setState({ ageRecs: recs });
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<>
				<PageNavbar />
				<Container className="justify-content-center p-3">
					<Card className="info flex-column my-3">
						<Card.Body>
							<h5>Readers Your Age Also Enjoyed</h5>
							{this.state.ageRecs}
						</Card.Body>
					</Card>
					<Card className="info flex-column my-3">
						<Card.Body>
							<h5>Readers Near You Also Enjoyed</h5>
							{this.state.locRecs}
						</Card.Body>
					</Card>
				</Container>
			</>
		);
	}
}

export default withRouter(UserRec);

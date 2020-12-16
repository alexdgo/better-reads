import React from 'react';
import PageNavBar from './PageNavbar';
import { Wrapper, StyledLink } from '../style/shared';
import { BookCard } from '../style/ProfileStyle';
import placeholder from '../files/placeholder.png';
import { Row, Col } from 'react-bootstrap';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toReadBooks: [],
			hasReadBooks: [],
		};
	}

	componentDidMount() {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				userid: window.localStorage.getItem('user_id'),
			}),
		};
		fetch('http://localhost:8081/userBooks/', requestOptions).then(async (resx) => {
			resx.json().then(async (res) => {
				console.log(res);
				if (res.status === 'false') {
					alert('error');
				} else {
					this.setState({ toReadBooks: res });
				}
			});
		});
		fetch('http://localhost:8081/userRated/', requestOptions).then(async (resx) => {
			resx.json().then(async (res) => {
				console.log(res);
				if (res.status === 'false') {
					alert('error');
				} else {
					this.setState({ hasReadBooks: res });
				}
			});
		});
	}

	render() {
		return (
			<>
				<PageNavBar />
				<Wrapper>
					<Row>
						<Col>
							<h2>Reading List</h2>
							{this.state.toReadBooks.map((book) => {
								const authorTrimmed = book.AUTHOR.includes('/')
									? book.AUTHOR.slice(0, book.AUTHOR.indexOf('/'))
									: book.AUTHOR;
								const d = {
									isbn: book.ISBN,
									title: book.TITLE,
									author: authorTrimmed,
									genre: book.GENRE,
									language: book.LANGUAGE,
									cover: book.COVER || placeholder,
									publisher: book.PUBLISHER,
									year_published: book.YEAR_PUBLISHED && parseInt(book.YEAR_PUBLISHED),
									price: book.PRICE && book.PRICE.toFixed(2),
									num_pages: book.NUM_PAGES,
								};
								return (
									<StyledLink href={`/book/${d.isbn}`}>
										<BookCard {...d} />
									</StyledLink>
								);
							})}
						</Col>
						<Col>
							<h2>Liked</h2>
							{this.state.hasReadBooks.map((book) => {
								const authorTrimmed = book.AUTHOR.includes('/')
									? book.AUTHOR.slice(0, book.AUTHOR.indexOf('/'))
									: book.AUTHOR;
								const d = {
									isbn: book.ISBN,
									title: book.TITLE,
									author: authorTrimmed,
									genre: book.GENRE,
									language: book.LANGUAGE,
									cover: book.COVER || placeholder,
									publisher: book.PUBLISHER,
									year_published: book.YEAR_PUBLISHED && parseInt(book.YEAR_PUBLISHED),
									price: book.PRICE && book.PRICE.toFixed(2),
									num_pages: book.NUM_PAGES,
								};
								return (
									<StyledLink href={`/book/${d.isbn}`}>
										<BookCard {...d} />
									</StyledLink>
								);
							})}
						</Col>
					</Row>
				</Wrapper>
			</>
		);
	}
}

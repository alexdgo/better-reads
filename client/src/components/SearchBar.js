import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';

import { BookContext } from './App';
import { SearchWrapper } from '../style/SearchStyle';

const SearchBar = () => {
	const [query, setQuery] = useState();
	const [type, setType] = useState('all');
	const { setQueryResult, setShowResult } = useContext(BookContext);
	const submitSearch = (e) => {
		e.preventDefault();
		fetch(`http://localhost:8081/search/${type}/${query}`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((res) => {
				setQueryResult(res);
				setShowResult(true);
			})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<SearchWrapper>
				<Form className="m-1">
					<Form.Control
						className="mx-1 ml-5"
						type="text"
						placeholder="What are you looking for?"
						onChange={(e) => setQuery(e.target.value)}
						style={{ float: 'left', width: '40%' }}
					/>
					<Form.Control
						className="mx-1"
						as="select"
						onChange={(e) => setType(e.target.value)}
						style={{ float: 'left', width: '20%' }}
					>
						<option>all</option>
						<option>books</option>
						<option>authors</option>
					</Form.Control>
					<Button
						className="mx-1"
						variant="outline-light"
						type="submit"
						onClick={submitSearch}
						style={{ float: 'left', width: '10%' }}
					>
						Search
					</Button>
				</Form>
			</SearchWrapper>
		</>
	);
};
export default SearchBar;

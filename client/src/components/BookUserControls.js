import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

export function BookUserControls({ isbn, small }) {
	let [userRating, setUserRating] = useState();
	let [inList, setInList] = useState(false);
	const [listButton, setListButton] = useState();
	const user = window.localStorage.getItem('user_id');

	useEffect(() => {
		console.log('user inside ', user);
		fetch(`http://localhost:8081/getUserRating/${isbn}&${user}`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((rtg) => {
				console.log(rtg);
				if (!rtg.RATING) {
					console.log('HEY');
					setUserRating(0);
				} else {
					setUserRating(rtg.RATING / 2);
				}
			})
			.catch((err) => console.log(err));
	}, [setUserRating, userRating]);

	useEffect(() => {
		fetch(`http://localhost:8081/getInList/${isbn}/${user}`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((list) => {
				if (list.length > 0) {
					setInList(true);
				}
			})
			.catch((err) => console.log(err));
	}, [setInList, inList]);

	function addRating(rating) {
		const data = { isbn: isbn, rating: rating, user: user };
		fetch(`http://localhost:8081/addRating`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(async (data) => {
				console.log(data);
				alert('Added rating!');
				setUserRating(data.rating);
			})
			.catch((err) => console.log(err));
	}

	function addToList() {
		// localStorage.getItem('myData');
		fetch(`http://localhost:8081/addToList/${isbn}/${user}`, {
			method: 'GET',
		})
			.then((res) => {
				console.log(res);
				alert('Added to List!');
				setInList(true);
			})
			.catch((err) => console.log(err));
	}

	function removeFromList() {
		fetch(`http://localhost:8081/deleteFromList/${isbn}/${user}`, {
			method: 'GET',
		})
			.then((res) => {
				console.log(res);
				alert('Removed!');
				setInList(false);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		setListButton(
			inList ? (
				<Button className={small ? 'btn-sm' : ''} variant="primary" onClick={removeFromList}>
					Remove From List
				</Button>
			) : (
				<Button className={small ? 'btn-sm' : ''} variant="outline-primary" onClick={addToList}>
					Add to Reading List
				</Button>
			)
		);
	}, [setInList, inList]);

	return (
		<>
			{listButton}
			{userRating != null && (
				<>
					<div className="caption">Your Rating</div>
					<ReactStars
						count={5}
						value={userRating || 0}
						isHalf={true}
						size={small ? 15 : 24}
						activeColor={'#ff0019'}
						onChange={addRating}
						edit={userRating == 0}
					/>
				</>
			)}
		</>
	);
}

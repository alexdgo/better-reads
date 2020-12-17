import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

export function BookUserControls({ isbn, small }) {
	let [userRating, setUserRating] = useState();
	let [inList, setInList] = useState();
	const user = window.localStorage.getItem('user_id');

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`http://localhost:8081/getUserRating/${isbn}&${user}`, {
				method: 'GET',
			});
			res.json()
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
		}
		fetchData();
	});

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`http://localhost:8081/getInList/${isbn}/${user}`, {
				method: 'GET',
			});
			res.json()
				.then((list) => {
					if (list.length > 0) {
						setInList(true);
					}
				})
				.catch((err) => console.log(err));
		}
		fetchData();
	});

	function addRating(rating) {
		setUserRating(rating);

		const data = { isbn: isbn, rating: rating, user: user };
		fetch(`http://localhost:8081/addRating`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((data) => {
				console.log(data);
				alert('Added rating!');
			})
			.catch((err) => console.log(err));
	}

	const addToList = () => {
		setInList(true);

		// localStorage.getItem('myData');
		fetch(`http://localhost:8081/addToList/${isbn}/${user}`, {
			method: 'GET',
		})
			.then((res) => {
				console.log(res);
				alert('Added to List!');
			})
			.catch((err) => console.log(err));
	};

	const removeFromList = () => {
		setInList(false);

		fetch(`http://localhost:8081/deleteFromList/${isbn}/${user}`, {
			method: 'GET',
		})
			.then((res) => {
				console.log(res);
				alert('Removed!');
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Button
				className={small ? 'btn-sm' : ''}
				variant={inList ? 'primary' : 'outline-primary'}
				onClick={inList ? removeFromList : addToList}
			>
				{inList ? 'Remove From List' : 'Add to Reading List'}
			</Button>
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
					/>
				</>
			)}
		</>
	);
}

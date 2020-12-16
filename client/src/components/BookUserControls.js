import React from 'react';
import { useState, useEffect } from "react";
import { Card, Button } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";


export function BookUserControls({isbn, small}) {
    let [userRating, setUserRating] = useState();
    const user = (window.sessionStorage.getItem('user_id')); 
    // console.log(user);

    useEffect(() => {
        fetch(`http://localhost:8081/getUserRating/${isbn}/${user}`, {
			method: 'GET',
		})
        .then((res) => res.json())
        .then((rtg) => {
            if (!rtg.rating) {
                setUserRating(0);
            } else {
                setUserRating(rtg.rating);
            }             
        })
        .catch((err) => console.log(err));
    }, [setUserRating, userRating]);

    function addRating(rating) {
        const data = { isbn: isbn, rating: rating, user: user}
        console.log("user in add: ", user);
        fetch(`http://localhost:8081/addRating`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(data => {
            console.log(data);
            alert("Added rating!");
            this.setState({userRating: data.rating});
        })
        .catch((err) => console.log(err));
    }

    function addToList() {
        // localStorage.getItem('myData');
        fetch(`http://localhost:8081/addToList/${isbn}/${user}`, {
			method: 'GET',
        })
			.then((res) => {
                console.log(res)
                alert("Added to List!")
			})
			.catch((err) => console.log(err));
    }

    return (
        <>
            <Button className={small ? "btn-sm" : ""} variant="outline-primary" onClick={addToList}>Add to Reading List</Button>
            {userRating != null &&
                <>
                <div className="caption">Your Rating</div> 
                    <ReactStars 
                        count={5}
                        value={userRating || 0}
                        isHalf={true}
                        size={small ? 15 : 24}
                        activeColor={"#ff0019"}
                        onChange={addRating}
                    /> 
                </>
            }
        </>
    )
}
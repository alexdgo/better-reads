import { useState, useEffect } from "react";
import React from 'react';
import ReactStars from "react-rating-stars-component";


export function BookRating({isbn, size}) {
    const [rating, setRating] = useState([]);

    // only runs once when the component is mounted not when state updates bc of the dependency
    useEffect(() => {
        fetch('http://localhost:8081/getRating/' + isbn, {
			method: 'GET',
		})
        .then((res) => res.json())
        .then((rtg) => {
            if (!rtg) return;
            
            setRating(
            <ReactStars 
                count={5}
                value={rtg.rating}
                isHalf={true}
                size={size}
                edit={false}
            />
            );
            console.log(rtg)
            console.log(rating);
        })
        .catch((err) => console.log(err));

        // return () => 
    }, []);

    console.log("r ", rating)
    return (
        rating
            // <ReactStars 
            //     count={5}
            //     value={rating}
            //     isHalf={true}
            //     size={24}
            //     edit={false}
            // />
    );



}
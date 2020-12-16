import React from "react";
import { Media, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import s from "styled-components";

const CardWrapper = s.div`
  margin-top: 1rem;
  background: #F5F5F5;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius:2rem;
`;

const BookTitle = s.h3`
  font-size: 130%;
`;

const BookAuthor = s.p`
  font-size: 100%;
`;

export const BookCard = ({ title, cover, author, avg_rating }) => (
  <CardWrapper>
    <Media className="align-items-center justify-content-center">
      <img
        height={"200rem"}
        className="align-self-start mr-3"
        src={cover}
        alt="cover"
      />
      <Media.Body>
        <BookTitle className="title">{title}</BookTitle>
        <BookAuthor>by {author}</BookAuthor>
        {
          <ReactStars
            count={5}
            value={avg_rating}
            isHalf={true}
            size={24}
            edit={false}
          />
        }
      </Media.Body>
    </Media>
  </CardWrapper>
);

import React from "react";
import { Media, Card, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import s from "styled-components";

export const SearchWrapper = s.nav`
  font-size: 80%;
  position: relative;
  z-index: 8;
  width: 100%;
`;

export const ResultWrapper = s.div`
  display: ${(props) => (props.showResult ? "block" : "none")};
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
`;

export const Overlay = s.div`
  content: " ";
  z-index: 50;
  display: block;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const ResultBlock = s.div`
  position: fixed;
  z-index: 100;
  width: 75%;
  height: 100%;
  background: white;
  left: 50%;
  margin-left: -37.5%;
  overflow: auto;
  padding: 2rem;
`;

const CardWrapper = s.div`
  margin-top: 1rem;
  background: #F5F5F5;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius:2rem;
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
        <h2 className="title">{title}</h2>
        <h4>by {author}</h4>
        {<ReactStars count={5} value={avg_rating} isHalf={true} size={24} />}
        <Button className="" variant="outline-primary" onClick={() => {}}>
          +
        </Button>
      </Media.Body>
    </Media>
  </CardWrapper>
);

import { Popover, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import { BookRating } from "./BookRating";
import { BookUserControls } from "./BookUserControls";

export function BookIcon(props) {
  const popover = (
    <Popover {...props} ref={props.ref} id="popover-basic" className="w-100">
      <Popover.Title as="h3">{props.title}</Popover.Title>
      <Popover.Content>
        <p>by {props.author}</p>
        {props.year_published && <p>published {props.year_published}</p>}
        {props.avg_rating && (
          <>
            <p>Avg Rating</p>
            <BookRating isbn={props.isbn} size={15} />
          </>
        )}
        <hr />
        <BookUserControls isbn={props.isbn} small={true} />
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement="right"
      overlay={popover}
      delay={{ hide: 400 }}
    >
      <a key={props.isbn} href={`/book/${props.isbn}`}>
        <img height={150} className="p-1" src={props.cover} alt={props.title} />
      </a>
    </OverlayTrigger>
  );
}

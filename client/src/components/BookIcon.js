import { Popover, OverlayTrigger } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react'
import { BookRating } from './BookRating'
import { BookUserControls } from './BookUserControls'

export function BookIcon ({isbn, title, cover, author, year_published, avg_rating}) {
    const popover = (
        <Popover id="popover-basic" className="w-100">
            <Popover.Title as="h3">{title}</Popover.Title>
            <Popover.Content>
            <p>by {author}</p>
            <p>published {year_published}</p>
            Avg Rating
            <BookRating isbn={isbn} size={15}/>
            <hr />
            <BookUserControls isbn={isbn} small={true}/>
            </Popover.Content>
        </Popover>
    );
    
    return (
        <OverlayTrigger trigger="hover" placement="right" overlay={popover} delay={{ hide: 1000 }}>
            <Link key={isbn} to={`/book/${isbn}`}>
                <img 
                    height={150}
                    className="p-1"
                    src={cover}
                    alt={title}
                />
            </Link>
        </OverlayTrigger>
    );
}




import React, { useContext } from 'react'
import { BookContext } from './App'
import { Link } from 'react-router-dom'
import { ResultWrapper, Overlay, ResultBlock, BookCard } from '../style/SearchStyle'
import placeholder from '../files/placeholder.png';
import { BookIcon } from './BookIcon';


const SearchResult = () => {
  const { queryResult, showResult, setShowResult } = useContext(BookContext)
  return (
    <>
    <ResultWrapper showResult = {showResult}>
      <Overlay/>
      <ResultBlock>
        <span class="close" onClick = {() => setShowResult(false)}>&times;</span>
        {queryResult.map(book => {
          const d = {
            isbn: book.ISBN, 
            title: book.TITLE, 
            author: book.AUTHOR,
            genre: book.GENRE,
            language: book.LANGUAGE,
            cover: book.COVER || placeholder, 
            publisher: book.PUBLISHER,
            year_published: book.YEAR_PUBLISHED && parseInt(book.YEAR_PUBLISHED),
            price: book.PRICE && book.PRICE.toFixed(2),
            num_pages: book.NUM_PAGES,
          }
          
          return (
          <Link to={`/book/${d.isbn}`}>
            <BookCard {...d}/>
          </Link>)
        })}
      </ResultBlock>
    </ResultWrapper>
    </>
  )
}

export default SearchResult
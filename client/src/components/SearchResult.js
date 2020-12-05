import React, { useContext } from 'react'
import { BookContext } from './App'
import { Link } from 'react-router-dom'
import { ResultWrapper, Overlay, ResultBlock, BookCard } from '../style/SearchStyle'


const SearchResult = () => {
  const { queryResult, showResult, setShowResult } = useContext(BookContext)
  return (
    <>
    <ResultWrapper showResult = {showResult}>
      <Overlay/>
      <ResultBlock>
        <span class="close" onClick = {() => setShowResult(false)}>&times;</span>
        {queryResult.map(d => (
          <Link to={`/book/${d.isbn}`}>
            <BookCard {...d}/>
          </Link>
        ))}
      </ResultBlock>
    </ResultWrapper>
    </>
  )
}

export default SearchResult
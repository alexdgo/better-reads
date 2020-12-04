import React, { useContext } from 'react'
import { BookContext } from './App'
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
          <div>
            <BookCard {...d}/>
          </div>
        ))}
      </ResultBlock>
    </ResultWrapper>
    </>
  )
}

export default SearchResult
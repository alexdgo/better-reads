import React, { useState, useContext } from 'react'
import {Button, Form} from 'react-bootstrap'

import { BookContext } from './App'
import { SearchWrapper } from '../style/SearchStyle'

const SearchBar = () => {
  const [query, setQuery] = useState()
  const [type, setType] = useState("all")
  const { setQueryResult, setShowResult } = useContext(BookContext)
  const submitSearch = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8081/search/${type}/${query}`, {
      method: 'GET' 
    })
      .then(res => res.json())
      .then(res => {
        setQueryResult(res)
        setShowResult(true)
      }) 
      .catch(err => console.log(err))	
  }
  return (
    <>
    <SearchWrapper>
      <Form>
        <Form.Control type="text" placeholder="what are you looking for..." 
          onChange={e => setQuery(e.target.value)}
          style = {{float:'left', width: '40%'}}/>
        <Form.Control as="select" onChange = {e => setType(e.target.value)}
          style = {{float:'left', width: '40%'}}>
          <option>all</option>
          <option>books</option>
          <option>authors</option>
        </Form.Control>
        <Button color="primary" type="submit" onClick ={submitSearch} 
          style={{float:'left', width:'10%'}}>
          Search
        </Button>
      </Form>
    </SearchWrapper>
    
    </>
  )
}
export default SearchBar
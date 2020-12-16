import React, { useContext } from "react";
import { BookContext } from "./App";
import {
  ResultWrapper,
  Overlay,
  ResultBlock,
  BookCard,
} from "../style/SearchStyle";
import placeholder from "../files/placeholder.png";

const SearchResult = () => {
  const { queryResult, showResult, setShowResult } = useContext(BookContext);
  return (
    <>
      <ResultWrapper showResult={showResult}>
        <Overlay />
        <ResultBlock>
          <span className="close" onClick={() => setShowResult(false)}>
            &times;
          </span>
          {queryResult.map((book) => {
            const d = {
              isbn: book.ISBN,
              title: book.TITLE,
              author: book.AUTHOR,
              genre: book.GENRE,
              language: book.LANGUAGE,
              cover: book.COVER || placeholder,
              publisher: book.PUBLISHER,
              year_published:
                book.YEAR_PUBLISHED && parseInt(book.YEAR_PUBLISHED),
              price: book.PRICE && book.PRICE.toFixed(2),
              num_pages: book.NUM_PAGES,
            };

            return (
              <a href={`/book/${d.isbn}`}>
                <BookCard {...d} />
              </a>
            );
          })}
        </ResultBlock>
      </ResultWrapper>
    </>
  );
};

export default SearchResult;

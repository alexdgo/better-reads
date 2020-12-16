import React, { useContext } from 'react';
import { BookContext } from './App';
import { ResultWrapper, Overlay, ResultBlock, BookCard } from '../style/SearchStyle';
import placeholder from '../files/placeholder.png';

const SearchResult = () => {
	const { queryResult, showResult, setShowResult } = useContext(BookContext);
	return (
		<>
			<ResultWrapper showResult={showResult}>
				<Overlay />
				<ResultBlock>
					<span class="close" onClick={() => setShowResult(false)}>
						&times;
					</span>
					{queryResult.map((book) => {
						const authorTrimmed = book.AUTHOR.includes('/')
							? book.AUTHOR.slice(0, book.AUTHOR.indexOf('/'))
							: book.AUTHOR;
						const d = {
							isbn: book.ISBN,
							title: book.TITLE,
							author: authorTrimmed,
							genre: book.GENRE,
							language: book.LANGUAGE,
							cover: book.COVER || placeholder,
							publisher: book.PUBLISHER,
							year_published: book.YEAR_PUBLISHED && parseInt(book.YEAR_PUBLISHED),
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

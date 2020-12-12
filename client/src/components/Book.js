import React from 'react';
import SearchBar from './SearchBar'
import {Container, Row, Col, Media, Button, Card} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import '../style/book.css';
import { BookCard } from '../style/SearchStyle'
import { Link } from 'react-router-dom'



// TODO: book recs
// TODO: check if user has previous rating

class Book extends React.Component {
    constructor(props) {
        super(props);
        const isbn = this.props.match.params.isbn;
        this.state = {
            isbn: isbn,
            authorRecs: [],
            genreRecs: []
        }

        this.addRating = this.addRating.bind(this);
        this.addToList = this.addToList.bind(this);
    }

    componentDidMount() {
        this.getBook();
        this.getRating();
        this.getAuthorRec();
        this.getGenreRec();
    }
    
    getBook() {
        fetch('http://localhost:8081/books/' + this.state.isbn, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((book) => {
				if (!book) return;
                
				this.setState(book);
			})
			.catch((err) => console.log(err));
    }

    getRating() {
        fetch('http://localhost:8081/getRating/' + this.state.isbn, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((rating) => {
				if (!rating) return;
                
				this.setState(rating);
			})
			.catch((err) => console.log(err));
    }

    addToList() {
        // localStorage.getItem('myData');
        fetch(`http://localhost:8081/addToList/${this.state.isbn}/1`, {
			method: 'GET',
        })
			.then((res) => {
                console.log(res)
                alert("Added to List!")
			})
			.catch((err) => console.log(err));
    }

    addRating(rating) {
        const data = { isbn: this.state.isbn, rating: rating, user: 1}
        fetch(`http://localhost:8081/addRating`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
            // .then((res) => res.json())
			.then(data => {
                console.log(data)
                alert("Added rating!")
			})
			.catch((err) => console.log(err));
    }

    getAuthorRec() {
        fetch('http://localhost:8081/authorRec/' + this.state.isbn, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((books) => {
				if (!books) return;
				const recs = books.map(b => (
                    <Link key={b.isbn} to={`/book/${b.isbn}`}>
                        <BookCard  {...b}/>
                    </Link>
                ));
                this.setState({authorRecs: recs})
			})
			.catch((err) => console.log(err));
    }

    getGenreRec() {
        fetch('http://localhost:8081/genreRec/' + this.state.isbn, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((books) => {
                if (!books) return;
                console.log(books);
				const recs = books.map(b => (
                    <Link key={b.isbn} to={`/book/${b.isbn}`}>
                        <BookCard  {...b}/>
                    </Link>
                ));
                this.setState({genreRecs: recs})
			})
			.catch((err) => console.log(err));
    }
    
    render() {
        return (
            <div>
            {/* <SearchBar/> */}
            <Container className="justify-content-center p-3">
                <Media className="align-items-center justify-content-center">
                    <img 
                        height={300}
                        className="align-self-start mr-3"
                        src={this.state.cover}
                        alt="cover"
                    />
                    <Media.Body className="">
                        <h2 className="title">{this.state.title}</h2>
                        <h4>by {this.state.author}</h4>
                        {this.state.rating &&
                            <ReactStars 
                                count={5}
                                value={this.state.rating}
                                isHalf={true}
                                size={24}
                                edit={false}
                            />
                        }
                        <Card className="userInfo flex-column mt-3 p-2 px-5 align-items-center">
                            <Button className="" variant="outline-primary" onClick={() => this.addToList()}>Add to Reading List</Button>
                            {/* <Row className="align-items-center"> */}
                                <div className="caption">Your Rating</div> 
                                <ReactStars 
                                    count={5}
                                    isHalf={true}
                                    size={24}
                                    activeColor={"#ff0019"}
                                    onChange={this.addRating}
                                />
                            {/* </Row> */}
                        </Card>
                    </Media.Body>
                </Media>
                {/* <Row className="content justify-content-between align-items-center"> */}
                <Card className="info flex-column my-3">
                    <Card.Body>
                        {this.state.isbn &&
                            <Row>
                                <Col><p className="label">ISBN</p></Col>
                                <Col>{this.state.isbn}</Col>
                            </Row>
                        } 

                        {this.state.genre &&
                            <Row>
                                <Col><p className="label">Genre</p></Col>
                                <Col>{this.state.genre}</Col>
                            </Row>
                        }

                        {this.state.language &&
                            <Row>
                                <Col><p className="label">Edition Language</p></Col>
                                <Col>{this.state.language === 'eng' ? "English" : this.state.language}</Col>
                            </Row>
                        }

                        {this.state.num_pages &&
                            <Row>
                                <Col><p className="label">Number of Pages</p></Col>
                                <Col>{this.state.num_pages}</Col>
                            </Row>
                        } 

                        {this.state.format &&
                            <Row>
                                <Col><p className="label">Format</p></Col>
                                <Col>{this.state.format}</Col>
                            </Row>
                        }

                        {this.state.price &&
                            <Row>
                                <Col><p className="label">Price</p></Col>
                                <Col>${this.state.price}</Col>
                            </Row>
                        }

                        {this.state.year_published && this.state.publisher &&
                            <div className="align-self-stretch">Published in {this.state.year_published} by {this.state.publisher}</div>
                        }
                    </Card.Body>
                </Card>
            <Card className="rec">
                <Card.Body>
                    <h5><b>YOU MAY ALSO LIKE</b></h5>
                    Based Off Author
                        {this.state.authorRecs}
                    Based Off Genre
                        {this.state.genreRecs}

                </Card.Body>
            </Card>
            </Container>

            </div>
        )
    }
}

export default withRouter(Book);
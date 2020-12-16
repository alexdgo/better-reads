import React from 'react';
import PageNavbar from './PageNavbar'
import {Container, Row, Col, Media, Button, Card, Carousel} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import '../style/book.css';
import { BookIcon } from './BookIcon';
import { BookRating } from './BookRating';
import { BookUserControls } from './BookUserControls';
import placeholder from '../files/placeholder.png';

class Book extends React.Component {
    constructor(props) {
        super(props);
        const isbn = this.props.match.params.isbn;
        const user = window.sessionStorage.getItem("user_id"); 

        this.state = {
            isbn: isbn,
            user: user,
            authorRecs: [],
            genreRecs: [], 
            userRating: 0,
        }

        this.addRating = this.addRating.bind(this);
        this.addToList = this.addToList.bind(this);
        this.getUserRating = this.getUserRating.bind(this);
        this.getAuthorRec = this.getAuthorRec.bind(this);
        this.render = this.render.bind(this);
    }

    componentDidMount() {
        this.getBook();
        this.getRating();
        this.getUserRating();
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
                
				this.setState({
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
                });
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

    getUserRating() {
        fetch(`http://localhost:8081/getUserRating/${this.state.isbn}/${this.state.user}`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((userRating) => {
                if (!userRating) return;
                
                var stars = <ReactStars 
                    count={5}
                    value={userRating.rating}
                    isHalf={true}
                    size={24}
                    activeColor={"#ff0019"}
                    onChange={this.addRating}
                />;

                this.setState({userRating : stars});
			})
			.catch((err) => console.log(err));
    }

    addToList() {
        // localStorage.getItem('myData');
        console.log(this.state.user)
        fetch(`http://localhost:8081/addToList/${this.state.isbn}/${this.state.user}`, {
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
            console.log(data);
            alert("Added rating!");
            this.setState({userRating: data.rating});
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
				const recs = books.map(book => {
                    const b = {
                        isbn: book.ISBN, 
                        title: book.TITLE, 
                        author: book.AUTHOR,
                        genre: book.GENRE,
                        language: book.LANGUAGE,
                        cover: book.COVER || placeholder, 
                        publisher: book.PUBLISHER,
                        year_published: book.YEAR_PUBLISHED && parseInt(book.YEAR_PUBLISHED),
                        price: book.PRICE,
                        num_pages: book.NUM_PAGES,
                    }
                    return <BookIcon {...b} />
                    // <div className="carousel-item active">
                    // <Link key={b.isbn} to={`/book/${b.isbn}`}>
                    //     <img 
                    //         height={150}
                    //         className="p-1"
                    //         src={b.cover}
                    //         alt={b.title}
                    //     />
                    // </Link>
                    // </div>
                });
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
				const recs = books.map(book => {
                    const b = {
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
                    return <BookIcon {...b} />
                });
                this.setState({genreRecs: recs})
			})
			.catch((err) => console.log(err));
    }
    
    render() {
        return (
            <div>
            <PageNavbar/>
            <Container className="justify-content-center p-3">
                <Media className="align-items-center justify-content-center">
                    <img 
                        height={300}
                        className="align-self-start mr-3"
                        src={this.state.cover}
                        alt="cover"
                    />
                    <Media.Body className="">
                        <div className="info">
                            <h2 className="title">{this.state.title}</h2>
                            <h4>by {this.state.author}</h4>
                            <BookRating isbn={this.state.isbn} size = {24}/>
                        </div>
                        <Card className="userInfo flex-column mt-3 p-2 px-4 align-items-center">
                            <BookUserControls isbn={this.state.isbn} />
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
                    {/* <h4><b>YOU MAY ALSO ENJOY</b></h4> */}
                    <h5>More By This Author</h5>
                    <div className="carousel slide" data-ride="carousel">
                    {/* <Carousel> */}
                        <div class="carousel-inner">
                        {this.state.authorRecs}
                        </div>
                    {/* </Carousel> */}
                    </div>
                    <hr />
                    <h5>More in This Genre</h5>
                    {/* <Carousel > */}
                    <div className="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                        {this.state.genreRecs}
                         </div>
                    </div>
                    {/* </Carousel> */}

                </Card.Body>
            </Card>
            </Container>

            </div>
        )
    }
}

export default withRouter(Book);
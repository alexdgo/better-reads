import React from 'react';
import SearchBar from './SearchBar'
import {Container, Row, Col, Media, Button, Card} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import '../style/book.css';

// TODO: book recs
// TODO: check if user has previous rating

class Book extends React.Component {
    constructor(props) {
        super(props);
        const isbn = this.props.match.params.isbn;
        this.state = {
            isbn: isbn,
            // title: null,
            // author: "", 
            // language: "",
            // num_pages: 0,
            // publisher: "",
            // year_published: 0, 
            // cover: "",
            // genre: null,
            // format: "",
            // price: 0, 
            // rating: null
        }

        this.addRating = this.addRating.bind(this);
        this.addToList = this.addToList.bind(this);
    }

    componentDidMount() {
        this.getBook();
        this.getRating();
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
    
    render() {
        return (
            <div>
            <SearchBar/>
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
            {/* </Row> */}
            </Container>

            </div>
        )
    }
}

export default withRouter(Book);
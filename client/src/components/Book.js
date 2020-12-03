import React from 'react';
import {Container, Row, Col, Media} from 'react-bootstrap';
import '../style/book.css';


export default class Book extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            isbn: "",
            title: "",
            author: "", 
            language: "",
            num_pages: 0,
            publisher: "",
            year_published: 0, 
            cover: "",
            genre: "",
            format: "",
            price: 0
        }
    }

    componentDidMount() {
        console.log('hello')
		fetch('http://localhost:8081/books/1', {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((book) => {
				if (!book) return;
                
                console.log(book)

				this.setState(book);
			})
			.catch((err) => console.log(err));
	}
    
    render() {
        return (
            <Container className="justify-content-center" fluid>
                <Media className="align-items-center">
                    <img 
                        height={300}
                        className="align-self-start mr-3"
                        src={this.state.cover}
                        alt="cover"
                    />
                    <Media.Body>
                        <h2 className="title">{this.state.title}</h2>
                        <h4>by {this.state.author}</h4>
                    </Media.Body>
                </Media>
                
                {this.state.isbn &&
                    <Row fluid>
                        <Col><p className="label">ISBN</p></Col>
                        <Col>{this.state.isbn}</Col>
                    </Row>
                } 

                {this.state.genre != "" &&
                    <Row fluid>
                        <Col><p className="label">Genre</p></Col>
                        <Col><p className="label">{this.state.genre}</p></Col>
                    </Row>
                }

                {this.state.language != "" &&
                    <Row fluid>
                        <Col><p className="label">Edition Language</p></Col>
                        <Col>{this.state.language == 'eng' ? "English" : this.state.language}</Col>
                    </Row>
                }

                {this.state.num_pages != 0 &&
                    <Row fluid>
                        <Col><p className="label">Number of Pages</p></Col>
                        <Col>{this.state.num_pages}</Col>
                    </Row>
                } 

                {this.state.format != "" &&
                    <Row fluid>
                        <Col><p className="label">Format</p></Col>
                        <Col>{this.state.format}</Col>
                    </Row>
                }

                {this.state.price != 0 &&
                    <Row fluid>
                        <Col><p className="label">Price</p></Col>
                        <Col>${this.state.price}</Col>
                    </Row>
                }

                {this.state.year_published != 0 && this.state.publisher != "" &&
                    <p>Published in {this.state.year_published} by {this.state.publisher}</p>
                }

            </Container>
        )
    }
}
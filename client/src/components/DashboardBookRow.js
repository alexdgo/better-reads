import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Media } from "react-bootstrap";

export default class DashboardBookRow extends React.Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    return (
      <div class="col-3">
        <div className="book">
          <Media className="align-items-center justify-content-center">
            <img
              height={300}
              className="align-self-start mr-3"
              src={this.props.book.cover}
              alt="cover"
            />
          </Media>
          <div class="row" text-align="center">
            <div class="col">
              <h7>{this.props.book.title}</h7>
              <br></br>
              <h7>by {this.props.book.author}</h7>
              <br></br>
              <h7>price ${this.props.book.price}</h7>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

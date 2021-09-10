import React, { Component } from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderDish(dish) {
    return (
      <Card>
        <CardImg width={'100%'} src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(comments) {
    if (comments != null) {
      return (
        <div>
          <h4>Comments</h4>
          <ul className='list-unstyled'>
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                 <div className='mb-4'> {comment.comment}</div>
                               <div className='mb-4'>
                                    --{comment.author}, {comment.date}
                                </div>
                </li>
              );
            })}
          </ul >
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }

  render () {
    if (this.props.selectedDish != null) {
      return (
        <div className={'row'}>
          <div className={'col-12 col-md-5 m-1'}>
            {this.renderDish(this.props.selectedDish)}
          </div>
          <div className={'col-12 col-md-5 m-1'}>
            {this.renderComments(this.props.selectedDish.comments)}
          </div>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }
}

export default DishDetail;
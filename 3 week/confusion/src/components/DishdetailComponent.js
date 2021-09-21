import React, { useState } from "react";
import {
	Card,
	CardImg,
	CardText,
	Row,
	CardBody,
	CardTitle,
	BreadcrumbItem,
	Breadcrumb,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Component } from "react";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderDish({ dish }) {
	return (
		<Card>
			<CardImg width={"100%"} src={dish.image} alt={dish.name} />
			<CardBody>
				<CardTitle>{dish.name}</CardTitle>
				<CardText>{dish.description}</CardText>
			</CardBody>
		</Card>
	);
}

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleSubmit(values) {
		console.log("Current State is: " + JSON.stringify(values));
		alert("Current State is: " + JSON.stringify(values));
	}

	render() {
		return (
			<div>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil fa-lg"></span> Submit Comment
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor="rating" md={12}>
									Rating
								</Label>
								<Col md={12}>
									<Control.select model=".rating" name="rating" className="form-control custom-select">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="yourname" md={12}>
									Your Name
								</Label>
								<Col md={12}>
									<Control.text
										model=".yourname"
										id="yourname"
										name="yourname"
										placeholder="Your Name"
										className="form-control"
										validators={{
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".yourname"
										show="touched"
										messages={{
											minLength: "Must be greater than 2 characters",
											maxLength: "Must be 15 characters or less",
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment" md={12}>
									Comment
								</Label>
								<Col md={12}>
									<Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={{ size: 10 }}>
									<Button type="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

function RenderComments({ comments }) {
	if (comments != null) {
		return (
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{comments.map((comment) => {
						return (
							<li key={comment.id}>
								<div className="mb-4"> {comment.comment}</div>
								<div className="mb-4">
									--{comment.author},{" "}
									{new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(Date.parse(comment.date)))}
								</div>
							</li>
						);
					})}
				</ul>
				<CommentForm />
			</div>
		);
	} else {
		return <div />;
	}
}

const DishDetail = (props) => {
	if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments comments={props.comments} />
					</div>
				</div>
			</div>
		);
	} else {
		return <div />;
	}
};

export default DishDetail;

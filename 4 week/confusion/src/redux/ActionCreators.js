import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
const fetchError = (response) => {
	if (response.ok) return response;
	else {
		var error = new Error("Error " + response.status + ": " + response.statusText);
		error.response = response;
		throw error;
	}
};
export const fetchDishes = () => async (dispatch) => {
	await dispatch(dishesLoading(true));
	return fetch(baseUrl + "dishes")
		.then(fetchError, (error) => {
			throw new Error(error.message);
		})
		.then((response) => response.json())
		.then((dishes) => dispatch(addDishes(dishes)))
		.catch((error) => dispatch(dishesFailed(error.message)));
};
export const dishesLoading = () => ({
	type: ActionTypes.DISHES_LOADING,
});
export const dishesFailed = (errmess) => ({
	type: ActionTypes.DISHES_FAILED,
	payload: errmess,
});
export const addDishes = (dishes) => ({
	type: ActionTypes.ADD_DISHES,
	payload: dishes,
});
export const fetchComments = () => async (dispatch) => {
	return fetch(baseUrl + "comments")
		.then(fetchError, (error) => {
			throw new Error(error.message);
		})
		.then((response) => response.json())
		.then((comments) => dispatch(addComments(comments)))
		.catch((error) => dispatch(commentsFailed(error.message)));
};
export const commentsFailed = (errmess) => ({
	type: ActionTypes.COMMENTS_FAILED,
	payload: errmess,
});
export const addComments = (comments) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: comments,
});
export const addComment = (comment) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: comment,
});
export const postComment = (dishId, rating, author, comment) => async (dispatch) => {
	const newComment = {
		dishId,
		rating,
		author,
		comment,
	};
	newComment.date = new Date().toISOString();
	return fetch(baseUrl + "comments", {
		method: "POST",
		body: JSON.stringify(newComment),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "same-origin",
	})
		.then(fetchError, (error) => {
			throw new Error(error.message);
		})
		.then((response) => response.json())
		.then((response) => dispatch(addComment(response)))
		.catch((error) => {
			console.log("Post Comments: " + error.message);
			alert("Your comment could not be posted\nError: " + error.message);
		});
};
export const fetchPromos = () => async (dispatch) => {
	await dispatch(promosLoading(true));
	return fetch(baseUrl + "promotions")
		.then(fetchError, (error) => {
			throw new Error(error.message);
		})
		.then((response) => response.json())
		.then((promos) => dispatch(addPromos(promos)))
		.catch((error) => dispatch(promosFailed(error.message)));
};
export const promosLoading = () => ({
	type: ActionTypes.PROMOS_LOADING,
});
export const promosFailed = (errmess) => ({
	type: ActionTypes.PROMOS_FAILED,
	payload: errmess,
});
export const addPromos = (promos) => ({
	type: ActionTypes.ADD_PROMOS,
	payload: promos,
});
export const fetchLeaders = () => async (dispatch) => {
	await dispatch(leadersLoading(true));
	return fetch(baseUrl + "leaders")
		.then(fetchError, (error) => {
			throw new Error(error.message);
		})
		.then((response) => response.json())
		.then((leaders) => dispatch(addLeaders(leaders)))
		.catch((error) => dispatch(leadersFailed(error.message)));
};
export const leadersLoading = () => ({
	type: ActionTypes.LEADERS_LOADING,
});
export const leadersFailed = (errmess) => ({
	type: ActionTypes.LEADERS_FAILED,
	payload: errmess,
});
export const addLeaders = (leaders) => ({
	type: ActionTypes.ADD_LEADERS,
	payload: leaders,
});
export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => async (dispatch) => {
	const newFeedback = {
		firstname,
		lastname,
		telnum,
		email,
		agree,
		contactType,
		message,
	};
	newFeedback.date = new Date().toISOString();
	return fetch(baseUrl + "feedback", {
		method: "POST",
		body: JSON.stringify(newFeedback),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "same-origin",
	})
		.then(fetchError, (error) => {
			throw new Error(error.message);
		})
		.then((response) => response.json())
		.then((newFeedback) => {
			console.log("Succesfull feedback: " + JSON.stringify(newFeedback));
			alert("Succesfull feedback: " + JSON.stringify(newFeedback));
		})
		.catch((error) => {
			console.log("Post Comments: " + error.message);
			alert("Your comment could not be posted\nError: " + error.message);
		});
};

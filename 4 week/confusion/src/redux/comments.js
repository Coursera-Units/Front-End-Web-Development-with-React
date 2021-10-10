import * as ActionTypes from "./ActionTypes";

export const Comments = (state = { errMess: null, comments: [] }, action) => {
	switch (action.type) {
		case ActionTypes.ADD_COMMENTS:
			return { ...state, errMess: null, comments: action.payload };

		case ActionTypes.COMMENTS_FAILED:
			return { ...state, errMess: action.payload };

		// eslint-disable-next-line no-duplicate-case
		case ActionTypes.ADD_COMMENTS:
			var comment = action.payload;

			return { ...state, comments: state.comments.concat(comment) };

		default:
			return state;
	}
};

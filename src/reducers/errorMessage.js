import { SET_ERROR_MESSAGE } from "../actions/actionTypes";

export default function errorMessage(state = {}, action) {
	switch (action.type) {
		case SET_ERROR_MESSAGE:
			return {
				...state,
				...action.errorType
			};
		default:
			return state;
	}
}
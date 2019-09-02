import { SET_CURRENT_RATE } from "../actions/actionTypes";

export default function currentRate(state = {}, action) {
	switch (action.type) {
		case SET_CURRENT_RATE:
			return {
				...state,
				...action.currentRate
			};
		default:
			return state;
	}
}
import { SET_DATE } from "../actions/actionTypes";

export default function date(state = {}, action) {
	switch (action.type) {
		case SET_DATE:
			return {
				...state,
				...action.date
			};
		default:
			return state;
	}
}
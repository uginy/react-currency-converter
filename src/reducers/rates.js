import { SET_RATES } from "../actions/actionTypes";

export default function rates(state = {}, action) {
	switch (action.type) {
		case SET_RATES:
			return {
				...state,
				...action.rates
			};
		default:
			return state;
	}
}
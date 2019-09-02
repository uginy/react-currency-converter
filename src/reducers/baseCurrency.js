import { SET_BASE_CURRENCY } from "../actions/actionTypes";

export default function baseCurrency(state = {}, action) {
	switch (action.type) {
		case SET_BASE_CURRENCY:
			return {
				...state,
				...action.baseCurrency
			};
		default:
			return state;
	}
}
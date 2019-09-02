import { SET_CONVERTED_CURRENCY } from "../actions/actionTypes";

export default function convertedCurrency(state = {}, action) {
	switch (action.type) {
		case SET_CONVERTED_CURRENCY:
			return {
				...state,
				...action.convertedCurrency
			};
		default:
			return state;
	}
}
import { SET_CONVERTED_AMOUNT } from "../actions/actionTypes";

export default function convertedAmount(state = {}, action) {
	switch (action.type) {
		case SET_CONVERTED_AMOUNT:
			return {
				...state,
				...action.convertedAmount
			};
		default:
			return state;
	}
}
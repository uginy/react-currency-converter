import { SET_BASE_AMOUNT } from "../actions/actionTypes";

export default function baseAmount(state = {}, action) {
	switch (action.type) {
		case SET_BASE_AMOUNT:
			return {
				...state,
				...action.baseAmount
			};
		default:
			return state;
	}
}
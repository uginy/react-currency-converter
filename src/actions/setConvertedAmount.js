import { SET_CONVERTED_AMOUNT } from "./actionTypes";

/**
 * Set currency converted amount action.
 * @param {num} arg converted currency amount to convert.
 */
export function setConvertedAmount(num) {
	let convertedAmount = {};

	if (typeof num === "number")
		convertedAmount["amount"] = num;

	return {
		type: SET_CONVERTED_AMOUNT,
		convertedAmount
	};
}
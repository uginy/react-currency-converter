import { SET_BASE_AMOUNT } from "./actionTypes";

/**
 * Set currency base amount action.
 * @param {num} arg Base currency amount to convert.
 */
export function setBaseAmount(num) {
	let baseAmount = {};

	if (typeof num === "number")
		baseAmount["amount"] = num;

	return {
		type: SET_BASE_AMOUNT,
		baseAmount
	};
}
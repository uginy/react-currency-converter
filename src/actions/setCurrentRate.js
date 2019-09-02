import { SET_CURRENT_RATE } from "./actionTypes";

/**
 * Set current rate action.
 * @param {num} arg Current rate.
 */
export function setCurrentRate(num) {
	let currentRate = {};
	if (typeof num === "number")
		currentRate["rate"] = num;
	return {
		type: SET_CURRENT_RATE,
		currentRate
	};
}
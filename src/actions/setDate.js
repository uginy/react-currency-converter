import { SET_DATE } from "./actionTypes";

/**
 * Set currency date action.
 * @param {data} arg data response from handleGetCurrencyData ./actions/shared.
 */
export function setDate(data) {
	let date = {};
	if (data !== null && typeof data.date !== "undefined") {
		const dateObj = new Date(data.date);

		// check if valid Date before setting property
		if (dateObj instanceof Date && !isNaN(dateObj)) {
			date["currencyDate"] = dateObj.toDateString();
		}
	}
	return {
		type: SET_DATE,
		date
	};
}

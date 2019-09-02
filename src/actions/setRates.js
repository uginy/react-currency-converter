import { SET_RATES } from "./actionTypes";
import { currency } from "../data/currency";

/**
 * Set currency rates action.
 * @param {data} arg data response from handleGetCurrencyData ./actions/shared.
 */
export function setRates(data) {
	let rates = {};
	if (data !== null && typeof data.rates !== "undefined") {
		/**
		 * --- Example of Object structure ---
		 * rates: {
		 * 	USD: {
		 *		name: "United States of America, Dollars",
		 *		symbol: "&#65284;",
		 *		rate: 1
		 * 	},
		 *   ...
		 * }
		 *
		 * Set rates object with api and currency data
		 */
		Object.keys(data.rates).map(item => {
			if (currency[item]) {
				rates[item] = {
					name: currency[item]["name"],
					symbol: currency[item]["symbol"],
					rate: data.rates[item]
				};
				/** --- Api structural issue fix ---
				 *	Certain currencies are not included
				 *  in {rates} if they are @param {base}
				 */
				rates[data.base] = {
					name: currency[data.base]["name"],
					symbol: currency[data.base]["symbol"],
					rate: 1
				};
			}
		});
	}

	return {
		type: SET_RATES,
		rates
	};
}
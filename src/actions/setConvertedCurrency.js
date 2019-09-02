import { SET_CONVERTED_CURRENCY } from "./actionTypes";

/**
 * Set converted currency action.
 * @param {currency} arg Converted currency.
 */
export function setConvertedCurrency(currency) {
	return {
		type: SET_CONVERTED_CURRENCY,
		convertedCurrency: {
			code: currency
		}
	};
}
import { SET_BASE_CURRENCY } from "./actionTypes";

/**
 * Set currency base action.
 * @param {base} arg Base currency to set rates.
 */
export function setBaseCurrency(base) {
	return {
		type: SET_BASE_CURRENCY,
		baseCurrency: {
			code: base
		}
	};
}

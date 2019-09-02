import { showLoading, hideLoading } from "react-redux-loading-bar";
import { fetchRequest } from "../utils/api";
import { setDate } from "./setDate";
import { setRates } from "./setRates";

const apiUrl = "https://api.exchangeratesapi.io/latest?base=";

/**
 * Handle fetching currency data from the api.
 * Dispatch actions based on data.
 * @param {base} arg Base value for currency.
 * @param {url} arg Api url string with default value.
 */
export function getCurrencyData(base = "USD", url = apiUrl) {
	return dispatch => {
		dispatch(showLoading());
		return fetchRequest(`${url}${base}`)
			.then(data => {
				if (!data.hasOwnProperty("error")) {
					dispatch(setDate(data));
					dispatch(setRates(data));
					dispatch(hideLoading());
				} else dispatch(hideLoading());
				// dispatch error action(s)?
			});
	};
}

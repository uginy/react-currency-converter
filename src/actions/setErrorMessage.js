import { SET_ERROR_MESSAGE } from "./actionTypes";

/**
 * Handle errors.
 * @param {error} arg Error type.
 */
export function setErrorMessage(error) {
	let errorType = {};
	switch (error) {
		case "currency":
			errorType["title"] = "Currency Code Error";
			errorType["message"] =
				"The currency code was not validated. " +
				"Please try selecting the currency again " +
				"or refreshing the page.";
			break;
		default:
			errorType["title"] = "There was an Error";
			errorType["message"] =
				"Please try the action again or refresh the page.";
	}
	console.log(errorType["message"]);
	return {
		type: SET_ERROR_MESSAGE,
		errorType
	};
}

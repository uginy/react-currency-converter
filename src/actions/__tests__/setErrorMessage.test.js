import { setErrorMessage } from "../setErrorMessage";
import { SET_ERROR_MESSAGE } from "../actionTypes";

const createAction = errorType => ({
	type: SET_ERROR_MESSAGE,
	errorType
});

describe("action", () => {
	describe("@return {Object} with property ['type'] and ['errorType']", () => {
		it("should return default error {Object} if error does not match", () => {
			const expectedAction = createAction({
				title: "There was an Error",
				message: "Please try the action again or refresh the page."
			});
			expect(setErrorMessage("unknownError")).toEqual(expectedAction);
		});
		it("should return currency error {Object} if @param is {string} currency", () => {
			const expectedAction = createAction({
				title: "Currency Code Error",
				message: `The currency code was not validated.
				Please try selecting the currency again
				or refreshing the page.`
			});
			expect(setErrorMessage("currency")).toEqual(expectedAction);
		});
	});
});
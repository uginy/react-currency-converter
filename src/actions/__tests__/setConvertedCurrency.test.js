import { setConvertedCurrency } from "../setConvertedCurrency";
import { SET_CONVERTED_CURRENCY } from "../actionTypes";

describe("action", () => {
	describe("@return {Object} with property ['type'] and ['convertedCurrency']", () => {
		const expectedAction = {
			type: SET_CONVERTED_CURRENCY,
			convertedCurrency: {
				code: "JPY"
			}
		}
		it("should set {Object}['convertedCurrency'] = {Object}['code'] = @param", () => {
			expect(setConvertedCurrency("JPY")).toEqual(expectedAction);
		});
	});
});
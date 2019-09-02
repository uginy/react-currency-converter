import { setBaseCurrency } from "../setBaseCurrency";
import { SET_BASE_CURRENCY } from "../actionTypes";

describe("action", () => {
	describe("@return {Object} with property ['type'] and ['baseCurrency']", () => {
		const expectedAction = {
			type: SET_BASE_CURRENCY,
			baseCurrency: {
				code: "USD"
			}
		}
		it("should set {Object}['baseCurrency'] = {Object}['code'] = @param", () => {
			expect(setBaseCurrency("USD")).toEqual(expectedAction);
		});
	});
});
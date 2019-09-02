import { setConvertedAmount } from "../setConvertedAmount";
import { SET_CONVERTED_AMOUNT } from "../actionTypes";

describe("action", () => {
	describe("@return {Object} with property ['type'] and ['convertedAmount']", () => {
		describe("If @param is not typeof number", () => {
			const expectedAction = {
				type: SET_CONVERTED_AMOUNT,
				convertedAmount: {}
			}
			it("should set {Object}['convertedAmount'] = empty {Object}", () => {
				expect(setConvertedAmount("123")).toEqual(expectedAction);
			});
		});
		describe("If @param is typeof number", () => {
			const expectedAction = {
				type: SET_CONVERTED_AMOUNT,
				convertedAmount: {
					amount: 123
				}
			}
			it("should set {Object}['convertedAmount'] = {Object}['amount'] = @param", () => {
				expect(setConvertedAmount(123)).toEqual(expectedAction);
			});
		});
	});
});
import { setBaseAmount } from "../setBaseAmount";
import { SET_BASE_AMOUNT } from "../actionTypes";

describe("action", () => {
	describe("@return {Object} with property ['type'] and ['baseAmount']", () => {
		describe("If @param is not typeof number", () => {
			const expectedAction = {
				type: SET_BASE_AMOUNT,
				baseAmount: {}
			}
			it("should set {Object}['baseAmount'] = empty {Object}", () => {
				expect(setBaseAmount("123")).toEqual(expectedAction);
			});
		});
		describe("If @param is typeof number", () => {
			const expectedAction = {
				type: SET_BASE_AMOUNT,
				baseAmount: {
					amount: 123
				}
			}
			it("should set {Object}['baseAmount'] = {Object}['amount'] = @param", () => {
				expect(setBaseAmount(123)).toEqual(expectedAction);
			});
		});
	});
});
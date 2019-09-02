import { setCurrentRate } from "../setCurrentRate";
import { SET_CURRENT_RATE } from "../actionTypes";

describe("action", () => {
	describe("@return {Object} with property ['type'] and ['currentRate']", () => {
		describe("If @param is not typeof number", () => {
			const expectedAction = {
				type: SET_CURRENT_RATE,
				currentRate: {}
			}
			it("should set {Object}['currentRate'] = empty {Object}", () => {
				expect(setCurrentRate("123")).toEqual(expectedAction);
			});
		});
		describe("If @param is typeof number", () => {
			const expectedAction = {
				type: SET_CURRENT_RATE,
				currentRate: {
					rate: 123
				}
			}
			it("should set {Object}['currentRate'] = {Object}['rate'] = @param", () => {
				expect(setCurrentRate(123)).toEqual(expectedAction);
			});
		});
	});
});
import { setRates } from "../setRates";
import { createData } from "../__mocks__/data";
import { SET_RATES } from "../actionTypes";

describe("action", () => {
	describe("@return {Object} with property type and rates", () => {

		const expectedEmptyRates = {
			type: SET_RATES,
			rates: {}
		};
		const expectedRates = {
			type: SET_RATES,
			rates: {
				"JPY": {
					name: "Japan, Yen",
					symbol: "&#165;",
					rate: 1
				},
				"USD": {
					name: "United States of America, Dollars",
					symbol: "&#65284;",
					rate: 1
				}
			}
		};

		describe("if @param {data} has no property of rates", () => {
			it("should be empty {Object}", () => {
				expect(setRates({noRates: "something"})).toEqual(expectedEmptyRates);
			});
		});
		describe("if @param {data} property rates is not {Object}", () => {
			it("should be empty {Object}", () => {
				expect(setRates("something")).toEqual(expectedEmptyRates);
			});
		});
		describe("if @param {data} property rates {Object} keys don't match currency {Object} keys", () => {
			it("should be empty {Object}", () => {
				expect(setRates({rates: {"ABC": 123}})).toEqual(expectedEmptyRates);
			});
		});
		describe("if @param {data} has rates {Object} with keys that match currency {Object} keys", () => {
			it("should be currency rate {Object}", () => {
				expect(setRates(createData({rates: {JPY: 1}}))).toEqual(expectedRates);
			});
		});
	});
});

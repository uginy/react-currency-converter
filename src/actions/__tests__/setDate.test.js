import { setDate } from "../setDate";
import { SET_DATE } from "../actionTypes";

describe("action", () => {
	describe("if @param data does not have property ['date']", () => {
		it("should return {Object} with ['date'] property set as empty {Object}", () => {
			const expectedAction = {
				type: SET_DATE,
				date: {}
			}
			expect(setDate({})).toEqual(expectedAction);
			expect(setDate({notDate: "some value"})).toEqual(expectedAction);
		});
	});
	describe("if @param data has property ['date']", () => {
		describe("if ['date'] property cannot be used to create valid Date {Object}", () => {
			const expectedAction = {
				type: SET_DATE,
				date: {}
			}
			it("should return {Object} with ['date'] property set as empty {Object}", () => {
				expect(setDate({date: "not date string"})).toEqual(expectedAction);
			});
		});
		describe("if ['date'] property can be used to create valid Date {Object}", () => {
			const expectedAction = {
				type: SET_DATE,
				date: {
					currencyDate: "Thu Dec 13 2018"
				}
			}
			it("should return {Object} with ['date'] property set as empty {Object}", () => {
				expect(setDate({date: "2018-12-13"})).toEqual(expectedAction);
			});
		});
	});
});
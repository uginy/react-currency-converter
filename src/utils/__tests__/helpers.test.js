import { checkCurrencyString } from "../helpers";

describe("Utility", () => {
	describe("checkCurrencyString", () => {
		describe("if @param in not a {string}", () => {
			it("should return false", () => {
				expect(checkCurrencyString(123)).toBeFalsy();
			});
		});
		describe("if @param {string} length is not 3", () => {
			it("should return false", () => {
				expect(checkCurrencyString("USDR")).toBeFalsy();
			});
		});
		describe("if @param {string} chars are not all letters", () => {
			it("should return false", () => {
				expect(checkCurrencyString("US1")).toBeFalsy();
			});
		});
		describe("if @param {string} chars are not all uppercase letters", () => {
			it("should return false", () => {
				expect(checkCurrencyString("usd")).toBeFalsy();
			});
		});
		describe("if @param {string} chars are all uppercase letters and length is 3", () => {
			it("should return true", () => {
				expect(checkCurrencyString("USD")).toBeTruthy();
			});
		});
	});
});

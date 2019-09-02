import React from "react";
import Header from "../Header";
import { shallow } from "enzyme";

let wrapper;
const createWrapper = props => shallow(<Header />);

describe("rendering", () => {
	beforeEach(() => {
		wrapper = createWrapper();
	});
	describe("header element", () => {
		it("should render header with class header", () => {
			expect(wrapper.find("header").length).toEqual(1);
			expect(wrapper.find("header").hasClass("header")).toBeTruthy();
		});
	});
	describe("div element", () => {
		it("should render div with class brand", () => {
			expect(wrapper.find("div").length).toEqual(1);
			expect(wrapper.find("div").hasClass("brand")).toBeTruthy();
		});
	});
});
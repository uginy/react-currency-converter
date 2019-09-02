import React from "react";
import SwitchButton from "../SwitchButton";
import { shallow } from "enzyme";

function createTestProps(props) {
	return {
		switchCurrency: jest.fn(),
		// allow to override common props
		...props
	};
}

let wrapper;
const createWrapper = props => shallow(<SwitchButton {...props} />);

describe("rendering", () => {
	beforeEach(() => {
		const props = createTestProps();
		wrapper = createWrapper(props);
	});
	describe("div element", () => {
		it("should render div with class column", () => {
			expect(wrapper.find("div").length).toEqual(1);
			expect(wrapper.find("div").hasClass("column")).toBeTruthy();
		});
	});
	describe("button element", () => {
		it("should render button with class button", () => {
			expect(wrapper.find("button").length).toEqual(1);
			expect(wrapper.find("button").hasClass("button")).toBeTruthy();
		});
	});
});

describe("event handling", () => {
	beforeEach(() => {
		const props = createTestProps();
		wrapper = createWrapper(props);
	});
	describe("onClick", () => {
		describe("<button />", () => {
			it("should call {props} switchCurrency", () => {
				const button = wrapper.find("button");
				const spy = jest.spyOn(button.props(), "onClick");
				const event = {target: {value: "button"}};
				button.simulate("click", event);
				expect(spy).toHaveBeenCalledTimes(1);
			});
		});
	});
});
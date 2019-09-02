import React from "react";
import CurrencyCard from "../CurrencyCard";
import { shallow } from "enzyme";

function createTestProps(props) {
	return {
		amount: 0,
		currency: "USD",
		rates: {},
		setCurrency: jest.fn(),
		setAmount: jest.fn(),
		isBase: true,
		// allow to override common props
		...props
	};
}

let wrapper, instance;
const createWrapper = props => shallow(<CurrencyCard {...props} />);

describe("rendering", () => {
	beforeEach(() => {
		const props = createTestProps();
		wrapper = createWrapper(props);
	});
	describe("elements and components", () => {
		it("should render div with class column", () => {
			expect(wrapper.find(".column").length).toEqual(1);
		});
	});
});

describe("lifecycle", () => {
	beforeEach(() => {
		const props = createTestProps();
		wrapper = createWrapper(props);
		instance = wrapper.instance();
	});
	describe("componentDidMount", () => {
		it("should setState for currencyValue and amountValue", () => {
			instance.componentDidMount();
			expect(wrapper.state().currencyValue).toBe("USD");
			expect(wrapper.state().amountValue).toBe(0);
		});
	});
});

describe("event handling", () => {
	beforeEach(() => {
		const props = createTestProps();
		wrapper = createWrapper(props);
		instance = wrapper.instance();
	});
	describe("onChange", () => {
		describe("<select />", () => {
			it("should call handleCurrencyChange method once", () => {
				const spy = jest.spyOn(instance, "handleCurrencyChange");
				const event = {target: {name: "currencyValue", value: "JPY"}};
				instance.componentDidMount();
				wrapper.find("select").simulate("change", event);
				expect(spy).toHaveBeenCalledTimes(1);
			});
			it("should call props function setCurrency once", () => {
				const spy = jest.spyOn(instance.props, "setCurrency");
				const event = {target: {name: "currencyValue", value: "JPY"}};
				instance.componentDidMount();
				wrapper.find("select").simulate("change", event);
				expect(spy).toHaveBeenCalledTimes(1);
			});
		});
		describe("<input />", () => {
			it("should call handleAmountChange method once", () => {
				const spy = jest.spyOn(instance, "handleAmountChange");
				const event = {target: {name: "currencyAmount", value: "2"}};
				instance.componentDidMount();
				wrapper.find("input").simulate("change", event);
				expect(spy).toHaveBeenCalledTimes(1);
			});
			it("should call props function setAmount once", () => {
				const spy = jest.spyOn(instance.props, "setAmount");
				const event = {target: {name: "currencyAmount", value: "2"}};
				instance.componentDidMount();
				wrapper.find("input").simulate("change", event);
				expect(spy).toHaveBeenCalledTimes(1);
			});
		});
	});
});

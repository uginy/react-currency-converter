import React from "react";
import { App } from "../App";
import { shallow } from "enzyme";

function createTestProps(props) {
	return {
		isLoaded: 0,
		date: "Mon Dec 17 2018",
		baseCurrency: "USD",
		convertedCurrency: "JPY",
		baseAmount: 0,
		convertedAmount: 0,
		rates: {},
		currentRate: 0,
		errorMessage: {},
		// dispatch action handlers
		handleSetBaseCurrency: jest.fn(),
		handleGetCurrencyData: jest.fn(),
		handleSetErrorMessage: jest.fn(),
		handleSetConvertedCurrency: jest.fn(),
		handleSetBaseAmount: jest.fn(),
		handleSetConvertedAmount: jest.fn(),
		handleSetCurrentRate: jest.fn(),
		// allow to override common props
		...props
	};
}

let wrapper, instance;
const createWrapper = props => shallow(<App {...props} />);

describe("rendering", () => {
	beforeEach(() => {
		const props = createTestProps();
		wrapper = createWrapper(props);
	});
	describe("initial state", () => {
		it("should have default date state", () => {
			const date = new Date().toDateString();
			expect(wrapper.state().date).toEqual(date);
		});
		it("should have default baseCurrency state", () => {
			expect(wrapper.state().baseCurrency).toEqual("USD");
		});
		it("should have default convertedCurrency state", () => {
			expect(wrapper.state().convertedCurrency).toEqual("JPY");
		});
		it("should have default baseAmount state", () => {
			expect(wrapper.state().baseAmount).toEqual(0);
		});
		it("should have default convertedAmount state", () => {
			expect(wrapper.state().convertedAmount).toEqual(0);
		});
		it("should have default currentRate state", () => {
			expect(wrapper.state().currentRate).toEqual(0);
		});
		it("should have default rates state", () => {
			expect(wrapper.state().rates).toEqual(null);
		});
	});
	describe("elements and components", () => {
		it("should render div with class wrapper", () => {
			expect(wrapper.find(".wrapper").length).toEqual(1);
		});
		it("should render div with class container", () => {
			expect(wrapper.find(".container").length).toEqual(1);
		});
		it("should render div with class row", () => {
			expect(wrapper.find(".row").length).toEqual(1);
		});
	});
});

describe("lifecycle", () => {
	beforeEach(() => {
		const props = createTestProps();
		wrapper = createWrapper(props);
	});
	describe("componentDidMount", () => {
		beforeEach(() => {
			instance = wrapper.instance();
		});
		it("should call getData method", () => {
			const spy = jest.spyOn(instance, "getData");
			instance.componentDidMount();
			expect(spy).toHaveBeenCalled();
		});
	});
});

describe("methods", () => {
	beforeEach(() => {
		const props = createTestProps();
		wrapper = createWrapper(props);
	});
	describe("getData", () => {
		beforeEach(() => {
			instance = wrapper.instance();
		});
		it("should call {props} handleGetCurrencyData", () => {
			const spy = jest.spyOn(instance.props, "handleGetCurrencyData");
			instance.componentDidMount();
			expect(spy).toHaveBeenCalled();
		});
	});
	describe("setCurrency", () => {
		beforeEach(() => {
			instance = wrapper.instance();
		});
		it("should call {props} handleSetBaseCurrency if @param isBase", () => {
			const spy = jest.spyOn(instance.props, "handleSetBaseCurrency");
			instance.setCurrency(true, "USD");
			expect(spy).toHaveBeenCalled();
		});
		it("should call {props} handleSetConvertedCurrency if @param !isBase", () => {
			const spy = jest.spyOn(
				instance.props,
				"handleSetConvertedCurrency"
			);
			instance.setCurrency(false, "JPY");
			expect(spy).toHaveBeenCalled();
		});
	});
	describe("setBase", () => {
		beforeEach(() => {
			instance = wrapper.instance();
		});
		it("should call {props} handleSetBaseAmount if @param amount !== {state} baseAmount", () => {
			const spy = jest.spyOn(instance.props, "handleSetBaseAmount");
			instance.setBase(10);
			expect(spy).toHaveBeenCalled();
		});
		it("should not call {props} handleSetBaseAmount if @param amount === {state} baseAmount", () => {
			const spy = jest.spyOn(instance.props, "handleSetBaseAmount");
			instance.setBase(0);
			expect(spy).not.toHaveBeenCalled();
		});
	});
	describe("setConverted", () => {
		beforeEach(() => {
			instance = wrapper.instance();
		});
		it("should not call {props} handleSetConvertedAmount if baseAmount === amount", () => {
			// amount = baseAmount * currentRate
			const spy = jest.spyOn(instance.props, "handleSetConvertedAmount");
			instance.setConverted();
			expect(spy).not.toHaveBeenCalled();
		});
		it("should call {props} handleSetConvertedAmount if baseAmount !== amount", () => {
			// amount = baseAmount * currentRate
			wrapper.setState({
				baseAmount: 1,
				currentRate: 1.5
			});
			const spy = jest.spyOn(instance.props, "handleSetConvertedAmount");
			instance.setConverted();
			expect(spy).toHaveBeenCalled();
		});
	});
	describe("setRate", () => {
		beforeEach(() => {
			instance = wrapper.instance();
		});
		it("should not call {props} handleSetCurrentRate if {state} !rates[convertedCurrency]", () => {
			const spy = jest.spyOn(instance.props, "handleSetCurrentRate");
			instance.setRate();
			expect(spy).not.toHaveBeenCalled();
		});
		it("should call {props} handleSetCurrentRate if {state} rates[convertedCurrency].rate", () => {
			wrapper.setState({
				rates: {
					JPY: {
						rate: 1
					}
				}
			});
			const spy = jest.spyOn(instance.props, "handleSetCurrentRate");
			instance.setRate();
			expect(spy).toHaveBeenCalled();
		});
	});
	describe("handleConvertedAmountChange", () => {
		beforeEach(() => {
			instance = wrapper.instance();
		});
		it("should not call setBase method if @param amount === newAmount", () => {
			// newAmount = amount / currentRate
			wrapper.setState({
				currentRate: 1
			});
			const spy = jest.spyOn(instance, "setBase");
			instance.handleConvertedAmountChange(0);
			expect(spy).not.toHaveBeenCalled();
		});
		it("should call setBase method if @param amount !== newAmount", () => {
			// newAmount = amount / currentRate
			wrapper.setState({
				currentRate: 1.5
			});
			const spy = jest.spyOn(instance, "setBase");
			instance.handleConvertedAmountChange(2);
			expect(spy).toHaveBeenCalled();
		});
	});
	describe("handleSwitchCurrency", () => {
		beforeEach(() => {
			instance = wrapper.instance();
		});
		it("should call setCurrency method twice", () => {
			const spy = jest.spyOn(instance, "setCurrency");
			instance.handleSwitchCurrency("JPY", "USD");
			expect(spy).toHaveBeenCalledTimes(2);
		});
	});
});

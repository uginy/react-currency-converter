import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import Header from "./Header";
import CurrencyCard from "./CurrencyCard";
import SwitchButton from "./SwitchButton";
import { getCurrencyData } from "../actions/shared";
import { setBaseCurrency } from "../actions/setBaseCurrency";
import { setConvertedCurrency } from "../actions/setConvertedCurrency";
import { setBaseAmount } from "../actions/setBaseAmount";
import { setConvertedAmount } from "../actions/setConvertedAmount";
import { setCurrentRate } from "../actions/setCurrentRate";
import { setErrorMessage } from "../actions/setErrorMessage";
import { checkCurrencyString, isUndefined } from "../utils/helpers";

export class App extends Component {
	// initial state
	state = {
		date: new Date().toDateString(),
		baseCurrency: "USD",
		baseAmount: 0,
		convertedCurrency: "JPY",
		convertedAmount: 0,
		rates: null,
		currentRate: 0
	};

	/**
	 * get the initial data on mount
	 *
	 */
	componentDidMount() {
		const { baseCurrency } = this.state;
		if (checkCurrencyString(baseCurrency)) {
			this.getData();
		} else console.log("currency string error");
	}

	/**
	 * check if props property values change
	 * and set state if value is different
	 */
	componentDidUpdate(prevProps) {
		const {
			date,
			baseCurrency,
			convertedCurrency,
			baseAmount,
			convertedAmount,
			rates,
			currentRate
		} = this.props;

		switch (true) {
			case date !== prevProps.date:
				console.log("setState: date");
				this.setState({ date: date });
				break;
			case baseCurrency !== prevProps.baseCurrency:
				console.log("setState: baseCurrency");
				this.setState({ baseCurrency: baseCurrency }, this.getData);
				break;
			case convertedCurrency !== prevProps.convertedCurrency:
				console.log("setState: convertedCurrency");
				this.setState(
					{ convertedCurrency: convertedCurrency },
					this.setRate
				);
				break;
			case baseAmount !== prevProps.baseAmount:
				console.log("setState: baseAmount");
				this.setState({ baseAmount: baseAmount }, this.setConverted);
				break;
			case convertedAmount !== prevProps.convertedAmount:
				console.log("setState: convertedAmount");
				this.setState({ convertedAmount: convertedAmount });
				break;
			case rates !== prevProps.rates:
				console.log("setState: rates");
				this.setState({ rates: rates }, this.setRate);
				break;
			case currentRate !== prevProps.currentRate:
				console.log("setState: currentRate");
				this.setState({ currentRate: currentRate }, this.setConverted);
				break;
		}
	}

	/**
	 * get the initial data
	 * @param {base} arg Base value for currency.
	 * if base currency code {string} is valid
	 * else set and handle invalid currency code {string}
	 */
	getData() {
		const { baseCurrency } = this.state;
		const { handleGetCurrencyData } = this.props;
		handleGetCurrencyData(baseCurrency);
	}

	/**
	 * set currency
	 * @param {isBase} arg Base currency flag.
	 * @param {currency} currency code
	 * set the currency if {currency} is valid
	 */
	setCurrency(isBase, currency) {
		const {
			handleSetBaseCurrency,
			handleSetConvertedCurrency
		} = this.props;
		if (checkCurrencyString(currency)) {
			if (isBase) {
				handleSetBaseCurrency(currency);
			} else handleSetConvertedCurrency(currency);
		} else console.log("call error method");
	}

	/**
	 * set base amount change
	 * @param {amount} arg Base value amount.
	 * set base amount if it changes
	 * and then set converted amount
	 */
	setBase(amount) {
		const { baseAmount } = this.state;
		const { handleSetBaseAmount } = this.props;
		const num = amount ? parseFloat(amount) : 0;
		if (baseAmount !== num) {
			handleSetBaseAmount(num);
		}
	}

	/**
	 * set converted amount
	 * calculate converted amount
	 * based on current rate
	 */
	setConverted() {
		const { baseAmount, convertedAmount, currentRate } = this.state;
		const { handleSetConvertedAmount } = this.props;
		const amount = baseAmount * currentRate;
		if (amount !== convertedAmount) handleSetConvertedAmount(amount);
	}

	/**
	 * set currenct rate
	 * @param {rate} Rate of converted
	 * currency compared to base currency
	 */
	setRate() {
		const { convertedCurrency, rates } = this.state;
		const { handleSetCurrentRate } = this.props;
		if (rates) {
			if (!isUndefined(rates[convertedCurrency])) {
				if (!isUndefined(rates[convertedCurrency].rate)) {
					handleSetCurrentRate(rates[convertedCurrency].rate);
				} else console.log("setRate error: needs handler.");
			} else console.log("setRate error: needs handler.");
		} else console.log("setRate error: needs handler.");
	}

	/**
	 * sets state
	 * for convertedAmount and if it's new
	 * it calls setBase
	 */
	handleConvertedAmountChange(amount) {
		const { baseAmount, currentRate } = this.state;
		const newAmount = amount / currentRate;
		if (newAmount !== amount) this.setBase(newAmount);
	}

	/**
	 * switches base and converted
	 * currency values
	 * calls setCurrency
	 * sets state for converted currency
	 */
	handleSwitchCurrency(base, converted) {
		this.setCurrency(true, converted);
		this.setCurrency(false, base);
		this.setState({
			convertedCurrency: base
		});
	}

	render() {
		const {
			date,
			baseAmount,
			baseCurrency,
			convertedAmount,
			convertedCurrency,
			rates
		} = this.state;

		return (
			<div className="wrapper">
				<LoadingBar />
				<Header />
				<div className="container">
					<div className="row py-1">
						<div className="column py-1">
							<strong>Exchange Date: </strong>
							{date}
						</div>
					</div>
					{rates !== null ? (
						<div className="row">
							<CurrencyCard
								amount={baseAmount}
								currency={baseCurrency}
								rates={rates}
								setCurrency={this.setCurrency.bind(this)}
								setAmount={this.setBase.bind(this)}
								isBase={true}
							/>
							<SwitchButton
								base={baseCurrency}
								converted={convertedCurrency}
								switchCurrency={this.handleSwitchCurrency.bind(
									this,
									baseCurrency,
									convertedCurrency
								)}
							/>
							<CurrencyCard
								amount={convertedAmount}
								currency={convertedCurrency}
								rates={rates}
								setCurrency={this.setCurrency.bind(this)}
								setAmount={this.handleConvertedAmountChange.bind(
									this
								)}
								isBase={false}
							/>
						</div>
					) : (
						<div>Loading...</div>
					)}
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		handleGetCurrencyData: base => {
			dispatch(getCurrencyData(base));
		},
		handleSetBaseCurrency: base => {
			dispatch(setBaseCurrency(base));
		},
		handleSetConvertedCurrency: currency => {
			dispatch(setConvertedCurrency(currency));
		},
		handleSetBaseAmount: amount => {
			dispatch(setBaseAmount(amount));
		},
		handleSetConvertedAmount: amount => {
			dispatch(setConvertedAmount(amount));
		},
		handleSetCurrentRate: rate => {
			dispatch(setCurrentRate(rate));
		},
		handleSetErrorMessage: error => {
			dispatch(setErrorMessage(error));
		}
	};
}

function mapStateToProps({
	date,
	loadingBar,
	baseAmount,
	baseCurrency,
	convertedAmount,
	convertedCurrency,
	currentRate,
	rates,
	errorMessage
}) {
	return {
		date: isUndefined(date.currencyDate) ? null : date.currencyDate,
		isLoaded: isUndefined(loadingBar.default) ? null : loadingBar.default,
		baseCurrency: isUndefined(baseCurrency.code) ? null : baseCurrency.code,
		baseAmount: isUndefined(baseAmount.amount) ? null : baseAmount.amount,
		convertedCurrency: isUndefined(convertedCurrency.code)
			? null
			: convertedCurrency.code,
		convertedAmount: isUndefined(convertedAmount.amount)
			? null
			: convertedAmount.amount,
		currentRate: isUndefined(currentRate.rate) ? null : currentRate.rate,
		rates: isUndefined(rates) ? null : rates,
		errorMessage: isUndefined(errorMessage) ? null : errorMessage
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

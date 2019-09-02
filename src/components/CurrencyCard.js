import React, { Component } from "react";

class CurrencyCard extends Component {
	// state for input and select values
	state = {
		currencyValue: "",
		amountValue: ""
	};

	componentDidMount() {
		this.setState({
			currencyValue: this.props.currency,
			amountValue: this.props.amount
		});
	}

	/**
	 * check if props property values change
	 * and set state if new
	 */
	componentDidUpdate(prevProps) {
		if (this.props.currency !== prevProps.currency) {
			this.setState({
				currencyValue: this.props.currency
			});
		}
		if (this.props.amount !== prevProps.amount) {
			this.setState({
				amountValue: Math.round(this.props.amount * 100) / 100
			});
		}
	}

	/**
	 * handleCurrencyChange() handles
	 * onChange event from select element,
	 * then sets state and calls setCurrency()
	 */
	handleCurrencyChange(event) {
		const { setCurrency, isBase } = this.props;
		setCurrency(isBase, event.target.value);
	}

	/**
	 * handleAmountChange() handles
	 * onChange event from input element,
	 * then sets state and calls setAmount()
	 */
	handleAmountChange(event) {
		const { setAmount } = this.props;
		const amount = event.target.value ? event.target.value : "";
		setAmount(amount);
	}

	render() {
		// props properties
		const { currency, amount, rates, isBase } = this.props;

		// state properties
		const { currencyValue, amountValue } = this.state;

		// element property
		const propertyName = isBase ? "base" : "converted";

		// once rates is loaded
		return (
			<div className="column column-40 card">
				<div className="card-body">
					<label htmlFor={propertyName}>
						{isBase ? "Base Currency" : "Converted Currency"}
					</label>
					<select
						id={propertyName}
						className="text-md"
						name={propertyName}
						value={currencyValue}
						onChange={this.handleCurrencyChange.bind(this)}
					>
						{Object.keys(rates).map(item => (
							<option
								key={item}
								value={item}
								dangerouslySetInnerHTML={{
									__html: `${rates[item].name} ${
										rates[item].symbol
									}`
								}}
							/>
						))}
					</select>
					<input
						className="text-md"
						type="number"
						name={`${propertyName}-amount`}
						value={amountValue}
						onChange={this.handleAmountChange.bind(this)}
					/>
				</div>
			</div>
		);
	}
}

export default CurrencyCard;

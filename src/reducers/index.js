import { combineReducers } from "redux";
import date from "./date";
import baseCurrency from "./baseCurrency";
import baseAmount from "./baseAmount";
import convertedCurrency from "./convertedCurrency";
import convertedAmount from "./convertedAmount";
import currentRate from "./currentRate";
import rates from "./rates";
import errorMessage from "./errorMessage";

import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
	date,
	baseCurrency,
	baseAmount,
	convertedCurrency,
	convertedAmount,
	currentRate,
	rates,
	errorMessage,
	loadingBar: loadingBarReducer
});
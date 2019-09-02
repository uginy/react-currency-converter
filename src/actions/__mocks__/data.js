/**
 * Create dummy data to mock api.
 * @param {data} arg Edit data property values
 */
export const createData = data => ({
	base: "USD",
	date: "2018-12-13",
	rates: {},
	...data
});

// dummy actions data for mocking
export const actionsData = {
	baseCurrency: {
		baseCurrency: "USD",
		type: "SET_BASE_CURRENCY"
	},
	show: {
		payload: { scope: "default" },
		type: "loading-bar/SHOW"
	},
	date: {
		date: { currencyDate: "Thu Dec 13 2018" },
		type: "SET_DATE"
	},
	rates: {
		rates: {
			USD: {
				name: "United States of America, Dollars",
				symbol: "&#65284;",
				rate: 1
			}
		},
		type: "SET_RATES"
	},
	hide: {
		payload: { scope: "default" },
		type: "loading-bar/HIDE"
	}
};

/**
 * Create expected actions array or objects.
 * @param {actions} arg Object.
 */
export const createExpectedActions = actions => {
	return Object.keys(actions).map(key => actions[key]);
}

export const checkCurrencyString = str => {
	let isCurrencyString = false;
	if (typeof str === "string") {
		if (
			str.length === 3 &&
			str === str.toUpperCase() &&
			!/[^a-zA-Z]/.test(str)
		) {
			isCurrencyString = true;
			return isCurrencyString;
		}
	}
	return isCurrencyString;
};

export const isUndefined = item => typeof item === "undefined";

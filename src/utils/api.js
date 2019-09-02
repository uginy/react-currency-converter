/**
 * Fetch data from the api.
 * @param {url} arg Api url string with default value.
 */
export const fetchRequest = (url) => {
	return fetch(url)
		.then(function(response) {
			if (!response.ok) {
				const err = new Error("HTTP status code: " + response.status);
				err.response = response;
				err.status = response.status;
				throw err;
			}
			return response.json();
		})
		.catch(function(error) {
			const errorMessage = error.toString();
			return {error: errorMessage};
		});
};
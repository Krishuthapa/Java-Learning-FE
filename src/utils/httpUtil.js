const baseApiUrl = 'http://localhost:8089';

/**
 * Holds the status of response from API call.
 *
 * @param {String} status
 */
function isHttpOk(status) {
	const statusStr = status.toString();
	return !(statusStr.startsWith('4') || statusStr.startsWith('5'));
}

/**
 * Fetch api for all the http services.
 *
 * @param   {Object}  args
 *
 * @returns  {Object}
 */
async function browserFetch(...args) {
	return window.fetch(args[0], args[1]).then(async (response) => {
		if (isHttpOk(response.status)) {
			return response;
		}

		/**
		 * Status code 412 for plate mapping's precondition error.
		 */
		if (response.status === 412) {
			const err = await response.json();

			throw { err, status: +response.status };
		}

		if (response.status !== 401) {
			const err = await response.json();

			throw { ...err, status: +response.status };
		}
	});
}

/**
 * Mock the browser's fetch function.
 *
 * @param {String} url
 * @param {Object} args
 * @param {String} baseUrl
 */
const http = async (url, args = {}, baseUrl = '') => {
	// eslint-disable-next-line no-useless-catch
	try {
		// TODO: Add the bearer token before sending any request.
		const apiBaseUrl = baseUrl || baseApiUrl;
		const requestUrl = `${apiBaseUrl}${url}`;
		const res = await browserFetch(requestUrl, {
			...args,
		});

		return res.json();
	} catch (err) {
		// TODO: Handle intercepting unauthorized calls.
		throw err;
	}
};

/**
 * Make GET requests.
 *
 * @param {String} url
 * @param {String} baseUrl
 */
export const get = async (url, baseUrl = undefined) => {
	return http(
		url,
		{
			headers: {
				accept: 'application/json;charset=UTF-8',
			},
		},
		baseUrl
	);
};

/**
 * Make POST requests.
 *
 * @param {String} url
 * @param {Object} data
 * @param {Object} args
 * @param {String} baseUrl
 */
export const post = async (url, data, args = {}, baseUrl) => {
	return http(
		url,
		{
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json;charset=UTF-8',
				accept: 'application/json;charset=UTF-8',
			},
			...args,
		},
		baseUrl
	);
};

/**
 * Make PATCH requests.
 *
 * @param {String} url
 * @param {Object} data
 * @param {Object} args
 * @param {String} baseUrl
 */
export const patch = async (url, data, args = {}, baseUrl) => {
	return http(
		url,
		{
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json;charset=UTF-8',
				accept: 'application/json;charset=UTF-8',
			},
			...args,
		},
		baseUrl
	);
};

/**
 * Make PUT requests.
 *
 * @param {String} url
 * @param {Object} data
 * @param {Object} args
 * @param {String} baseUrl
 */
export const put = async (url, data, args = {}, baseUrl) => {
	return http(
		url,
		{
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json;charset=UTF-8',
				accept: 'application/json;charset=UTF-8',
			},
			...args,
		},
		baseUrl
	);
};

/**
 * Make DELETE requests.
 *
 * @param {String} url
 * @param {String} baseUrl
 */
export const remove = async (url, baseUrl) => {
	return http(
		url,
		{
			method: 'DELETE',
		},
		baseUrl
	);
};

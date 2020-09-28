/**
 * Checks whether the incoming value is empty or null.
 *
 * @param {String} value
 */
export const isEmpty = (value) => {
	if (typeof value === 'string') {
		return !value.trim();
	}
	return !value;
};

/**
 * Trims the string.
 *
 * @param {String} string
 */
export const trimString = (string) => {
	return isEmpty(string) ? string : string.trim();
};

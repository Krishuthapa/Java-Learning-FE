/**
 * Check if array is empty or not.
 *
 * @param {Array} array
 */
export const isEmpty = (array) => {
	return !Array.isArray(array) || !array.length;
};

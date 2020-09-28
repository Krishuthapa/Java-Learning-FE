import * as http from '../utils/httpUtil';
import { interpolate } from '../utils/stringInterpolate';

import { endpoints } from '../constants/endpoints';

export const fetchTodos = async () => {
	return await http.get(endpoints.getTodos);
};

export const addTodo = async (payload) => {
	return await http.post(endpoints.addTodo, payload);
};

export const deleteTodo = async (param) => {
	const url = interpolate(endpoints.deleteTodo, param);

	return await http.remove(url);
};

export const updateTodoStatus = async (id, payload) => {
	const url = interpolate(endpoints.updateTodo, { id });

	return await http.patch(url, payload);
};

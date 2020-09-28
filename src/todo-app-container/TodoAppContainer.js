import React, { Component } from 'react';

import TodoList from './todo-list/TodoList';
import TodoInput from './todo-input/TodoInput';

import './TodoAppContainer.css';

import { isEmpty as isObjectEmpty } from '../utils/objectUtil';
import { isEmpty as isStringEmpty, trimString } from '../utils/stringUtil';

import { fetchTodos, addTodo, deleteTodo, updateTodoStatus } from '../serivces/TodoService';

class TodoAppContainer extends Component {
	/**
	 * Constructor;
	 */
	constructor() {
		super();

		this.state = {
			todoInput: '',
			todos: [],
		};

		this.onTodoInputChange = this.onTodoInputChange.bind(this);
		this.onTodoInputSubmit = this.onTodoInputSubmit.bind(this);

		this.onTodoDeleteClick = this.onTodoDeleteClick.bind(this);
		this.onTodoStatusChange = this.onTodoStatusChange.bind(this);
	}

	/**
	 * Lifecylce callback invoked when the component is
	 * mounted to the dom.
	 */
	componentDidMount() {
		this.fetchAndSetTodos();
	}

	/**
	 * Fetches and sets the todo.
	 */
	async fetchAndSetTodos() {
		const response = await this.fetchTodos();

		if (response.isError) {
			console.error(response.error);
			return;
		}

		this.setState({ todos: [...response] });
	}

	/**
	 * Fetches the todo via the api call.
	 */
	async fetchTodos() {
		try {
			return await fetchTodos();
		} catch (error) {
			return { isError: true, error };
		}
	}

	/**
	 * Handles the change in input of todo.
	 * @param {Object} event
	 */
	onTodoInputChange(event) {
		this.setState({ todoInput: event.target.value });
	}

	/**
	 * Creates the payload while uploading todo.
	 */
	createUploadPayload() {
		return { isCompleted: false, todoInfo: this.state.todoInput };
	}

	/**
	 * Handles the submission of input.
	 */
	async onTodoInputSubmit() {
		const trimmedInputValue = !isStringEmpty(this.state.todoInput)
			? trimString(this.state.todoInput)
			: this.state.todoInput;

		if (isStringEmpty(trimmedInputValue)) {
			return;
		}

		const payload = this.createUploadPayload();

		const response = await this.addTodo(payload);

		if (response.isError) {
			console.error(response.error);
			return;
		}

		this.setState({ todoInput: '' });

		this.fetchAndSetTodos();
	}

	/**
	 * Adds a new todo via an api call.
	 *
	 * @param {Object} payload
	 */
	async addTodo(payload) {
		try {
			return await addTodo(payload);
		} catch (error) {
			return { isError: true, error };
		}
	}

	/**
	 * Handles the request to delete a particular todo.
	 *
	 * @param {Event} event
	 * @param {Number} id
	 */
	async onTodoDeleteClick(event, id) {
		const response = await this.deleteTodo(id);

		if (response.isError) {
			console.error(response.error);
			return;
		}

		this.fetchAndSetTodos();
	}

	/**
	 * Deletes the todo of a given id.
	 *
	 * @param {Number} id
	 */
	async deleteTodo(id) {
		try {
			return await deleteTodo({ id });
		} catch (error) {
			return { isError: true, error };
		}
	}

	/**
	 * Creates the payload for change in status.
	 *
	 * @param {Number} id
	 */
	createStatusChangedTodoPayload(todoId) {
		const changedTodo = this.state.todos.find((todo) => todo.id === todoId);

		if (!isObjectEmpty(changedTodo)) {
			return { isCompleted: !changedTodo.isCompleted };
		}

		return { isCompleted: false };
	}

	/**
	 * Handles the request to a particular todo status.
	 *
	 * @param {Event} event
	 * @param {Number} id
	 */
	async onTodoStatusChange(event, id) {
		const payload = this.createStatusChangedTodoPayload(id);

		const response = await this.updateTodoStatus(id, payload);

		if (response.isError) {
			console.error(response.error);
			return;
		}

		this.fetchAndSetTodos();
	}

	/**
	 * Updates the status of todo via an api call.
	 *
	 * @param {Number} id
	 * @param {Object} payload
	 */
	async updateTodoStatus(id, payload) {
		try {
			return await updateTodoStatus(id, payload);
		} catch (error) {
			return { isError: true, error };
		}
	}

	/**
	 * Renders the component.
	 */
	render() {
		return (
			<div className="todo-container">
				<h1>TODO APP</h1>
				<TodoInput
					todoValue={this.state.todoInput}
					onTodoInputChange={this.onTodoInputChange}
					onInputSubmit={this.onTodoInputSubmit}
				></TodoInput>

				<div className="todo-list-container">
					<TodoList
						todos={this.state.todos}
						onTodoDeleteClick={this.onTodoDeleteClick}
						onTodoStatusChange={this.onTodoStatusChange}
					></TodoList>
				</div>
			</div>
		);
	}
}

export default TodoAppContainer;

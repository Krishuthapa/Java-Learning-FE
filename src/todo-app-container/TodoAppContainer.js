import React, { Component } from 'react';

import TodoList from './todo-list/TodoList';
import TodoInput from './todo-input/TodoInput';

import './TodoAppContainer.css';

import { isEmpty as isStringEmpty, trimString } from '../utils/stringUtil';

let id_counter = 0;

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
	 * Handles the change in input of todo.
	 * @param {Object} event
	 */
	onTodoInputChange(event) {
		this.setState({ todoInput: event.target.value });
	}

	/**
	 * Handles the submission of input.
	 */
	onTodoInputSubmit() {
		const trimmedInputValue = !isStringEmpty(this.state.todoInput)
			? trimString(this.state.todoInput)
			: this.state.todoInput;

		if (isStringEmpty(trimmedInputValue)) {
			return;
		}

		this.setState({
			todos: [...this.state.todos, { id: id_counter, isCompleted: false, value: this.state.todoInput }],
		});

		this.setState({ todoInput: '' });

		id_counter += 1;
	}

	/**
	 * Handles the request to delete a particular todo.
	 *
	 * @param {Event} event
	 * @param {Number} id
	 */
	onTodoDeleteClick(event, id) {
		const filteredTodos = this.state.todos.filter((todo) => todo.id !== id);

		this.setState({ todos: [...filteredTodos] });
	}

	/**
	 * Handles the request to a particular todo status.
	 *
	 * @param {Event} event
	 * @param {Number} id
	 */
	onTodoStatusChange(event, id) {
		const updatedTodos = this.state.todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, isCompleted: !todo.isCompleted };
			}

			return { ...todo };
		});

		this.setState({ todos: [...updatedTodos] });
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

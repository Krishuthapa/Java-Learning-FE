import React, { Component } from 'react';

import TodoItem from '../todo-item/TodoItem';

import { isEmpty as isArrayEmpty } from '../../utils/arrayUtil';

class TodoList extends Component {
	/**
	 * Renders todo items.
	 */
	renderTodoItems() {
		if (isArrayEmpty(this.props.todos)) {
			return '';
		}

		return this.props.todos.map((todo) => (
			<TodoItem
				key={todo.id}
				content={todo}
				onDeleteIconClick={this.props.onTodoDeleteClick}
				onCheckboxClick={this.props.onTodoStatusChange}
				isCompleted={todo.isCompleted}
			></TodoItem>
		));
	}

	/**
	 * Renders the component
	 */
	render() {
		return <div className="todo-list">{this.renderTodoItems()}</div>;
	}
}

export default TodoList;

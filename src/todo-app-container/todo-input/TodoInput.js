import React, { Component } from 'react';

import './TodoInput.css';

class TodoInput extends Component {
	constructor() {
		super();

		this.onKeyPress = this.onKeyPress.bind(this);
	}

	/**
	 * Callback called after the component is mounted for the first time.
	 */
	componentDidMount() {
		document.getElementById('todo-input').addEventListener('keyup', this.onKeyPress);
	}

	/**
	 * Handles the key press.
	 *
	 * @param {Event} event
	 */
	onKeyPress(event) {
		if (event.key === 'Enter') {
			this.props.onInputSubmit();
		}
	}

	/**
	 * Lifecyle invoked on component unmount.
	 */
	componentWillUnmount() {
		document.getElementById('todo-input').removeEventListener('keyup', this.onKeyPress);
	}

	/**
	 * Renders the component.
	 */
	render() {
		return (
			<div className="input-container">
				<input
					id="todo-input"
					value={this.props.todoValue || ''}
          onChange={this.props.onTodoInputChange}
          placeholder="Enter your todo here..."
				></input>
			</div>
		);
	}
}

export default TodoInput;

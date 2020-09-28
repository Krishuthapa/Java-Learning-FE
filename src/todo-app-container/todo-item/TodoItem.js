import React, { Component } from 'react';

import './TodoItem.css';

class TodoItem extends Component {
	render() {
		return (
			<div className="todo-item">
				<div className="left-container">
					<input
						type="checkbox"
						className="todo-status"
						checked={this.props.isCompleted}
						onChange={(event) => this.props.onCheckboxClick(event, this.props.content.id)}
					></input>

					<span className={`todo-value ${this.props.isCompleted ? 'completed' : ''}`}>
						{this.props.content.todoInfo}
					</span>
				</div>

				<span
					className="todo-delete"
					onClick={(event) => this.props.onDeleteIconClick(event, this.props.content.id)}
				>
					Delete
				</span>
			</div>
		);
	}
}

export default TodoItem;

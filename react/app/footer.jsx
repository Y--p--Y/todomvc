import React from 'react';
import classNames from 'classNames';

export default React.createClass({
  render: function () {
    return <footer className="footer">
      <span className="todo-count">
        {this.props.todos.length} item left
      </span>
      <ul className='filters'>
        <li><a href='#/all'>All</a></li>
        <li><a href='#/active'>Active</a></li>
        <li><a href='#/completed'>Completed</a></li>
      </ul>
      <button
				className="clear-completed"
				onClick={this.props.onClearCompleted}>
				Clear completed
			</button>
    </footer>;

  }
});

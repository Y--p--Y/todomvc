import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classNames';

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

export default React.createClass({
  getInitialState: function () {
    return {
      editText: this.props.todo.title
    };
  },
  handleSubmit: function () {
    var val = this.state.editText.trim();
    if (val) {
      this.props.update(val); //update title
      this.setState({
        editText: val
      });
    } else {
      this.props.onDestroy();
    }
    this.props.onEditing(false);
  },
  handleChange: function (e) {
    if (this.props.editing) {
      this.setState({
        editText: e.target.value
      });
    }
  },
  handleKeyDown: function (e) {
    if (e.keyCode === ENTER_KEY) {
      this.handleSubmit();//update title
    } else if (e.keyCode === ESCAPE_KEY) {
      this.setState({
        editText: this.props.todo.title
      });
      this.props.onEditing(false);
    }
  },
  handleEdit: function() {
    // set editing
    this.props.onEditing(true);
  },
  componentDidUpdate: function (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = ReactDOM.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  },
  render: function () {
    return <li className={classNames({
        completed: this.props.todo.completed,
        editing: this.props.editing
      })}>
        <div className="view">
						<input
							className="toggle"
							type="checkbox"
							checked={this.props.todo.completed}
							onChange={this.props.onToggle}
						/>
						<label onDoubleClick={this.handleEdit}>
							{this.props.todo.title}
						</label>
						<button className="destroy" onClick={this.props.onDestroy} />
				</div>
        <input
					ref="editField"
					className="edit"
					value={this.state.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
      </li>;
  }
});

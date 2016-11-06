import React from 'react';
import TodoItem from './todoItem';
import Footer from './footer';

var app = {};
app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';

export default React.createClass({
    getInitialState: function () {
      return {
        newTodo: '',
        editing: 0,
        nowShowing: app.ALL_TODOS
      };
    },
    componentDidMount: function () {
      var self = this;
      window.onhashchange = function(){
        self.setState({
          nowShowing: location.hash.replace(/^#\/?/, '')
        });
      }
    },
    handleNewTodoKeyDown: function (e) {
      var val = this.state.newTodo.trim();
      if (e.keyCode === 13 && val) {
        this.props.model.add(val);
        this.setState({
          newTodo: ''
        });
      }
    },
    handleChange: function (e) {
      this.setState({
        newTodo: e.target.value
      });
    },
    handleRemove: function (todo) {
      this.props.model.remove(todo);
    },
    handleEditing: function (todo, editing) {
      this.setState({
        editing: editing ? todo.id : 0
      });
    },
    toggleAll: function (e) {
      this.props.model.toggleAll(e.target.checked);
    },
    handleToggle: function (todo) {
        this.props.model.toggle(todo);
    },
    handleClearCompleted: function () {
      this.props.model.clearCompleted();
    },
    save: function (todo, title) {
      this.props.model.save(todo, title);
    },
    render: function () {
      var model = this.props.model;

      var showTodos = model.todos.filter(function (item) {
        if(this.state.nowShowing === 'active') {
          return !item.completed;
        } else if (this.state.nowShowing === 'completed') {
          return item.completed;
        }
        return true;
      }, this);

      var main, footer;
      if (model.todos.length) {
        main = <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onClick={this.toggleAll}/>
          <ul className="todo-list">
            {showTodos.map(function (todo) {
              return <TodoItem
                key={todo.id}
                todo={todo}
                editing={this.state.editing === todo.id}
                update={this.save.bind(this, todo)}
                onEditing={this.handleEditing.bind(this, todo)}
                onToggle={this.handleToggle.bind(this, todo)}
                onDestroy={this.handleRemove.bind(this, todo)}/>;
            }, this)}
          </ul>
        </section>;
        footer = <Footer
          todos = {model.todos}
          onClearCompleted={this.handleClearCompleted}
          nowShowing = {this.state.nowShowing}
        />;
      }

      return <div>
        <header>
          <h1>Todos</h1>
          <input
            className='new-todo'
            value={this.state.newTodo}
            autoFocus
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            placeholder='Type things todo'/>
        </header>
        {main}
        {footer}

      </div>;
    }
  });

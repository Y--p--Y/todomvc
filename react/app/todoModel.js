import Utils from './utils.js';

var TodoModel = function () {
  this.todos = [];
  this.onChange = [];
}

TodoModel.prototype.inform = function () {
  this.onChange.forEach(function (cb) {
    cb();
  });
};

TodoModel.prototype.subscribe = function (cb) {
    this.onChange.push(cb);
};

TodoModel.prototype.add = function (title) {
  this.todos = this.todos.concat({
    title: title,
    id: +new Date(),
    completed: false
  });
  this.inform();
};

TodoModel.prototype.toggleAll = function (checked) {
  this.todos = this.todos.map(function(todo) {
    return Utils.merge(todo, {completed: checked});
  });
  this.inform();
};

TodoModel.prototype.toggle = function (todo) {
  this.todos = this.todos.map(function (item) {
    return todo === item ? Utils.merge(item, {completed: !item.completed}) : item;
  });
  this.inform();
};

TodoModel.prototype.clearCompleted = function () {
  this.todos = this.todos.filter(function (todo) {
    return !todo.completed;
  });
  this.inform();
};

TodoModel.prototype.remove = function (todo) {
  this.todos = this.todos.filter(function (item) {
    return todo !== item;
  });
  this.inform();
};

TodoModel.prototype.save= function (todo, title) {
  this.todos = this.todos.map(function (item) {
    return todo === item ?
      Utils.merge(item, {title: title}) : item;
  });
  this.inform();
};

export default TodoModel;

/*global React, Router*/

(function(){
  'use strict';

  var TodoApp = React.createClass({
    getInitialState: function () {
      return {

      };
    },
    render: function () {
      return <div>
        <TodoItem todos = {model.todos} />
        <Footer todos = {model.todos} />
      </div>;
    }
  });

  var model = new TodoModel();

  function render() {
    ReactDOM.render(
      <TodoApp model={model}/>,
      document.querySelector('.todo')
    );
  }

  render();
})();

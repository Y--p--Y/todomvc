import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import TodoModel from './todoModel';

var model = new TodoModel();

function render () {
  ReactDOM.render(
    <App model={model}/>,
    document.getElementById('app')
  );
}

model.subscribe(render);
render();

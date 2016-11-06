import Store from './store.js';
import Controller from './controller.js';
import View from './view.js';
import Template from './template.js';
import {$on} from './helpers.js';

// init
const store = new Store('./vanilla-es6');
const template = new Template();
const view = new View(template);
const controller = new Controller(store, view);

const setView = () => { // router
  controller.setView(document.location.hash);
};
$on(window, 'load hashchange', setView);

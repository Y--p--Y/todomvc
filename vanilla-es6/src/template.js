import {escapeForHTML} from './helpers.js';

export default class Template {
  itemList(items) {
    return items.reduce((html, item) => html + `
      <li data-id="${item.id}"${item.completed ? ' class="completed"' : ''}>
      	<input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}>
      	<label class="view">${escapeForHTML(item.title)}</label>
      	<button class="destroy"></button>
      </li>`, '');
  }

  itemCounter(activeTodos) {
    return `${activeTodos} item${activeTodos ? 's' : ''} left`;
  }
};

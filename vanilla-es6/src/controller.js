import {$on, $delegate} from './helpers.js';

export default class Controller {
  constructor(store, view) {
    this.store = store;
    this.view = view;

    this._lastActiveRoute = null;
    this._hash = '';

    // event listeners
    // add item
    view.bindAddItem(this.handleAddItem.bind(this));
    // remove item
    view.bindRemoveItem(this.handleRemoveItem.bind(this));
    // toggle all
    view.bindToggleAll(this.handleToggleAll.bind(this));
    // toggle single
    view.bindToggle(this.handleToggle.bind(this));
    // update todo
    view.bindUpdate(this.handleKeydown.bind(this));
    // clear completed
    view.bindClearCompleted(this.handleClearCompleted.bind(this));
  }
  handleAddItem(title) {
    this.store.insert({
      title,
      id: +new Date(),
      completed: false
    }, () => {
      this.view.clearNewTodo();
      this._filter();
    });
  }
  handleRemoveItem(id) {
    this.store.remove(
      id,
      this._filter.bind(this)
    );
  }
  handleToggle(id, completed) {
    this.store.update({
        id,
        completed
      },
      this._filter.bind(this)
    );
  }
  handleToggleAll(completed) {
    this.store.toggleAll(
      completed,
      this._filter.bind(this)
    );
  }
  handleKeydown(id, title) {
    if (title) {
      // save
      this.store.update({
        id,
        title
      }, this.view.updateItemDone(id, title));
    } else {
      // cancel editing
      this.handleRemoveItem(id);
    }
  }
  handleClearCompleted() {
    this.store.clearCompleted(this._filter.bind(this));
  }
  setView(hash) {
    hash = hash.replace(/^#\//, '');
    if (hash != 'active' && hash != 'completed') {
        hash = '';
    }

    this._hash = hash;
    if (this._lastActiveRoute != hash) {
      this._filter();
      this.view.updateFilter(hash);
      this._lastActiveRoute = hash;
    }
  }
  _filter() {
    let query = {};
    if (this._hash === 'active') {
        query.completed = false;
    } else if (this._hash === 'completed') {
        query.completed = true;
    }

    this.store.query(query, this.view.showTodoList.bind(this.view));

    this.store.count((total, active, completed) => {
      this.view.updateItemCounter(active);
      this.view.setClearCompletedVisibility(completed > 0);
      this.view.setCompleteAll(completed === total);
      this.view.setMainVisibility(total > 0);
    });
  }
}

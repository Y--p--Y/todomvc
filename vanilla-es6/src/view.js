import Template from './template.js';
import {$on, $delegate, qs} from './helpers.js';

const _itemId = (elem) => +elem.parentElement.dataset.id;

export default class View {
  constructor(template) {
    this.template = template;

    this.$main = qs('.main');
    this.$todoList = qs('.todo-list');
    this.$todoItemCounter  = qs('.todo-count');
    this.$toggleAll = qs('.toggle-all');
    this.$clearCompleted = qs('.clear-completed');
    this.$newTodo = qs('.new-todo');
    this.$filters = qs('.filters');
  }
  bindAddItem(handler) {
    $on(this.$newTodo, 'change', ({target}) => {
      const val = target.value.trim();
      val && handler(val);
    });
  }
  bindRemoveItem(handler) {
    $delegate(this.$todoList, '.destroy', 'click', ({target}) => {
      handler(_itemId(target));
    });
  }
  bindUpdate(handler) {
    $delegate(this.$todoList, 'label', 'dblclick', ({target}) => {
      let li = target.parentElement;
      li.classList.add('editing');
      let input = document.createElement('input');
      input.className = 'edit';
      input.value = target.textContent;
      li.appendChild(input);
      input.focus();
    });

    $delegate(this.$todoList, '.edit', 'blur', ({target}) => {
      handler(_itemId(target), target.value.trim());
    }, true);

    $delegate(this.$todoList, '.edit', 'keydown', ({keyCode, target}) => {
      if (keyCode !== 13 && keyCode !== 27) {
        return;
      }

      if (keyCode === 13) {
        handler(_itemId(target), target.value.trim());
      }
    });
  }
  updateItemDone(id, title) {
    const li = qs(`li[data-id='${id}']`);
    if (li) {
      li.removeChild(qs('.edit', li));
      qs('label', li).textContent = title;
      li.classList.remove('editing');
    }
  }
  bindToggleAll(handler) {
    $on(this.$toggleAll, 'click', ({target}) => {
      handler(target.checked);
    });
  }
  bindToggle(handler) {
    $delegate(this.$todoList, '.toggle', 'click', ({target}) => {
      handler(_itemId(target), target.checked);
    });
  }
  bindClearCompleted(handler) {
    $on(this.$clearCompleted, 'click', handler);
  }
  clearNewTodo() {
    this.$newTodo.value = '';
  }
  showTodoList(todoList, editing) {
    this.$todoList.innerHTML = this.template.itemList(todoList, editing);
  }
  updateItemCounter(count) {
    this.$todoItemCounter.innerHTML = this.template.itemCounter(count);
  }
  updateFilter(hash) {
    var selected = qs(`a[href='#/${hash}']`, this.$filters) ||
      qs(`a[href='#/']`, this.$filters);
    var prevSelected = qs('.selected', this.$filters);
    if (prevSelected !== selected) {
      selected.classList.add('selected')
      prevSelected.classList.remove('selected')
    }
  }

  setClearCompletedVisibility(visibility) {
    this.$clearCompleted.style.display = visibility ? 'inline' : 'none';
  }

  setCompleteAll(completeAll) {
    this.$toggleAll.checked = completeAll;
  }
  setMainVisibility(visible) {
    this.$main.style.display = visible ? 'block' : 'none';
  }
}

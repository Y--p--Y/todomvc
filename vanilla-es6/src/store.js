export default class Store {
  constructor(name) {
    this.name = name;

    let liveTodos;

    this.getLocalStorage = () => {
      if (!liveTodos) {
        liveTodos = JSON.parse(localStorage.getItem(this.name) || '[]');
      }
      return liveTodos;
    };

    this.setLocalStorage = list => {
      localStorage.setItem(this.name, JSON.stringify(liveTodos = list));
    };
  }
  /**
  * id, completed
  */
  query(query, callback) {
    const list = this.getLocalStorage().filter(item => {
      for (var key in query) {
        if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });

    if (callback) {
      callback(list);
    } else {
      return list;
    }
  }
  insert (item, callback) {
    this.setLocalStorage(this.getLocalStorage().concat(item));
    callback && callback();
  }
  toggleAll (completed, callback) {
    const list = this.getLocalStorage().map(function (todo) {
      todo.completed = completed;
      return todo;
    });
    this.setLocalStorage(list);
    callback && callback();
  }

  update (query, callback) {
    this.setLocalStorage(this.getLocalStorage().map(item => {
      if (item.id === query.id) {
        for (var key in query) {
          if (query.hasOwnProperty(key)) {
            item[key] = query[key];
          }
        }
      }
      return item;
    }));
    callback && callback();
  }
  remove (id, callback) {
    id = +id;
    if (!id) {
      return;
    }

    this.setLocalStorage(this.getLocalStorage().filter(todo => todo.id !== id));
    callback && callback();
  }
  clearCompleted () {
    this.setLocalStorage(this.getLocalStorage().filter(todo => !todo.completed));
  }
  count (callback) {
    const list = this.getLocalStorage();
    const completed = list.filter(item => item.completed).length;
    callback(list.length, list.length - completed, completed);
  }
}

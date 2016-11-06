export function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

export function $on(target, events, handler, capture) {
  events.split(' ').forEach(function (type) {
    target.addEventListener(type, handler, !!capture);
  });
}

export function $delegate(target, selector, events, handler, capture) {
  const delegateHandler = (e) => {
    const elem = target.querySelectorAll(selector);
    if (!elem || !elem.length) {
      return;
    }

    // check e.target is selector
    for (var i = 0; i < elem.length; i++) {
      if(elem[i] === e.target) {
        handler.call(e.target, e);
        break;
      }
    }
  };

  events.split(' ').forEach(function (type) {
    target.addEventListener(type, delegateHandler, !!capture);
  });
}

export function escapeForHTML(str) {
    return str.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}

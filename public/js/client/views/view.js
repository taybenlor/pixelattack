(function() {
  var View;
  View = (function() {
    function View(parent, options) {
      this.parent = parent;
      this.events = _([]);
      this.event_listeners = _({});
      this.element = $('<div></div>');
      this.children = _([]);
      if (this.parent != null) {
        this.parent.addChild(this);
      }
    }
    View.prototype.render = function() {
      return this.element;
    };
    View.prototype.addChild = function(c) {
      return this.children.push(c);
    };
    View.prototype.removeChild = function(c) {
      return this.children = _(this.children.without(c));
    };
    View.prototype.hide = function() {
      return this.element.addClass('hidden');
    };
    View.prototype.show = function() {
      return this.element.removeClass('hidden');
    };
    View.prototype.remove = function() {
      return this.element.remove();
    };
    View.prototype.destroy = function() {
      return this.remove();
    };
    View.prototype.event = function(name) {
      this.events.push(name);
      return this.event_listeners[name] = _([]);
    };
    View.prototype.listen = function(name, fn) {
      if (!this.event_listeners[name]) {
        this.event(name);
      }
      return this.event_listeners[name].push(fn);
    };
    View.prototype.unlisten = function(name, fn) {
      return this.event_listeners[name] = this.event_listeners[name].without(fn);
    };
    View.prototype.fire = function(name, obj) {
      var done;
      if (!this.event_listeners[name]) {
        this.event(name);
      }
      done = this.event_listeners[name].any(_(function(fn) {
        return fn.call(this, name, obj);
      }).bind(this));
      if (this.parent && !done) {
        return this.parent.fire(name, obj);
      }
    };
    return View;
  })();
  window.View = View;
}).call(this);

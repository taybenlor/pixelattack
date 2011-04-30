(function() {
  var View;
  View = (function() {
    function View(parent, options) {
      this.parent = parent;
      this.events = _([]);
      this.element = $('<div></div>');
      this.children = _([]);
    }
    View.prototype.render = function() {
      return this.element;
    };
    View.prototype.addChild = function(c) {
      return this.children.push(c);
    };
    View.prototype.removeChild = function(c) {
      return this.children = this.children.without(c);
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
      if (this.parent) {
        this.parent.event(name);
      }
      this.events.push(name);
      return this["_event_" + name + "_listeners"] = _([]);
    };
    View.prototype.listen = function(name, fn) {
      return this["_event_" + name + "_listeners"].push(fn);
    };
    View.prototype.unlisten = function(name, fn) {
      return this["_event_" + name + "_listeners"] = this["_event_" + name + "_listeners"].without(fn);
    };
    View.prototype.fire = function(name, obj) {
      var done;
      done = this["_event_" + name + "_listeners"].any(_(function(fn) {
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

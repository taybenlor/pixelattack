(function() {
  var View;
  View = (function() {
    function View(parent, options) {
      this.parent = parent;
      this.element = $('<div></div>');
    }
    View.prototype.render = function() {
      return this.element;
    };
    return View;
  })();
  window.View = View;
}).call(this);

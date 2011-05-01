(function() {
  var EndView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  EndView = (function() {
    __extends(EndView, View);
    function EndView(parent) {
      EndView.__super__.constructor.apply(this, arguments);
      this.element = $("<section class=\"intro\">\n\n</section>");
    }
    EndView.prototype.render = function() {
      return this.element;
    };
    return EndView;
  })();
  window.EndView = EndView;
}).call(this);

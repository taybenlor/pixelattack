(function() {
  var TowerView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  TowerView = (function() {
    __extends(TowerView, View);
    function TowerView(parent, tower) {
      this.tower = tower;
      TowerView.__super__.constructor.apply(this, arguments);
      this.element = $("<figure class=\"tower " + this.tower.type + "\">\n</figure>");
    }
    TowerView.prototype.render = function() {
      return this.element;
    };
    return TowerView;
  })();
  window.TowerView = TowerView;
}).call(this);

(function() {
  var Tower;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Tower = (function() {
    __extends(Tower, Model);
    function Tower(type) {
      if (!type) {
        type = "default";
      }
      this.attr("type", {
        "default": type
      });
      this.attr("attacking", {
        "default": null
      });
    }
    return Tower;
  })();
  window.Tower = Tower;
}).call(this);

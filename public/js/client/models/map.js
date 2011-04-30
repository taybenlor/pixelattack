(function() {
  var Map;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Map = (function() {
    __extends(Map, Model);
    function Map(width, height) {
      Map.__super__.constructor.apply(this, arguments);
      this.attr('width', {
        "default": width || 15
      });
      this.attr('height', {
        "default": height || 10
      });
      this.tiles = _([]);
      _(_.range(this.width)).each(_.bind(function(x) {
        return _(_.range(this.height)).each(_.bind(function(y) {
          return this.tiles.push(new Tile(x, y));
        }, this));
      }, this));
    }
    return Map;
  })();
  window.Map = Map;
}).call(this);

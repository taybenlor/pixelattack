(function() {
  var MapView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  MapView = (function() {
    __extends(MapView, View);
    function MapView(parent, map, width, height) {
      this.map = map;
      this.width = width;
      this.height = height;
      MapView.__super__.constructor.apply(this, arguments);
      if (this.width == null) {
        this.width = 750;
      }
      if (this.height == null) {
        this.height = 500;
      }
      this.element = $("<figure style=\"width:" + this.width + "px;height:" + this.height + "px\" class=\"map\">\n  \n</figure>");
      this.tiles = _([]);
      this.map.tiles.each(_(function(tile) {
        return this.addChild(new TileView(this, tile));
      }).bind(this));
    }
    MapView.prototype.render = function() {
      this.element.html("");
      this.children.each(_(function(v) {
        return this.element.append(v.render());
      }).bind(this));
      return this.element;
    };
    return MapView;
  })();
  window.MapView = MapView;
}).call(this);

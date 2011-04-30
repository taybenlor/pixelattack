(function() {
  var TileView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  TileView = (function() {
    __extends(TileView, View);
    function TileView(tile, width, height) {
      this.tile = tile;
      this.width = width;
      this.height = height;
      TileView.__super__.constructor.apply(this, arguments);
      if (this.width == null) {
        this.width = 50;
      }
      if (this.height == null) {
        this.height = 50;
      }
      this.element = $("<figure data-x=\"" + this.tile.x + "\" data-y=\"" + this.tile.y + "\"\n  class=\"tile\" \n  style=\"width:" + this.width + "px;height:" + this.height + "px;top:" + (this.tile.y * this.height) + "px;left:" + (this.tile.x * this.width) + "px\">\n</figure>");
      this.tile.listen('thing', _.bind(function() {
        return this.render;
      }, this));
    }
    TileView.prototype.render = function() {
      return this.element.html("");
    };
    return TileView;
  })();
  window.TileView = TileView;
}).call(this);

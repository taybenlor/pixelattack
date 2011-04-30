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
    function TileView(parent, tile, width, height) {
      this.tile = tile;
      this.width = width;
      this.height = height;
      TileView.__super__.constructor.apply(this, arguments);
      this.event('click');
      if (this.width == null) {
        this.width = 50;
      }
      if (this.height == null) {
        this.height = 50;
      }
      this.element = $("<figure data-x=\"" + this.tile.x + "\" data-y=\"" + this.tile.y + "\"\n  class=\"tile\" \n  style=\"width:" + this.width + "px;height:" + this.height + "px;top:" + (this.tile.y * this.height) + "px;left:" + (this.tile.x * this.width) + "px\">\n</figure>");
      this.element.click(_(function() {
        log('clicked!');
        return this.fire('click', {
          source: this,
          details: ''
        });
      }).bind(this));
      this.tile.listen('thing', _(function() {
        return this.render;
      }).bind(this));
    }
    TileView.prototype.render = function() {
      this.element.html("");
      this.children.each(_(function(v) {
        return this.element.append(v.render());
      }).bind(this));
      return this.element;
    };
    return TileView;
  })();
  window.TileView = TileView;
}).call(this);

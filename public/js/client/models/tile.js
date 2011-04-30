(function() {
  var Tile;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Tile = (function() {
    __extends(Tile, Model);
    function Tile(x, y) {
      this.x = x;
      this.y = y;
      Tile.__super__.constructor.apply(this, arguments);
      this.attr('thing');
    }
    Tile.prototype.place = function(thing) {
      if (this.thing != null) {
        return false;
      }
      return this.thing = thing;
    };
    Tile.prototype.clear = function() {
      var thing;
      thing = this.thing.leave;
      this.thing = null;
      return thing;
    };
    return Tile;
  })();
  window.Tile = Tile;
}).call(this);

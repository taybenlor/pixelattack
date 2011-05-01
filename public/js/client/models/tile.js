(function() {
  var TIME_TO_CONVERT, Tile;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  TIME_TO_CONVERT = 20000;
  Tile = (function() {
    __extends(Tile, Model);
    function Tile(map, x, y) {
      this.map = map;
      this.x = x;
      this.y = y;
      Tile.__super__.constructor.apply(this, arguments);
      this.placed = null;
      this.attr('thing', {
        "default": null
      });
      this.attr('converted', {
        "default": false
      });
      this.thing = null;
    }
    Tile.prototype.occupied = function() {
      return !!this.thing;
    };
    Tile.prototype.place = function(thing) {
      if (this.thing != null) {
        return false;
      }
      this.thing = thing;
      this.placed = ticks;
      return thing;
    };
    Tile.prototype.clear = function() {
      var thing;
      this.placed = null;
      thing = this.thing;
      this.thing = null;
      return thing;
    };
    Tile.prototype.update = function() {
      if (!this.placed) {
        return;
      }
      if (!(this.thing instanceof Enemy)) {
        return;
      }
      if ((ticks - this.placed) > TIME_TO_CONVERT) {
        return this.converted = true;
      }
    };
    Tile.prototype.left = function() {
      if (this._left) {
        return this._left;
      }
      return this._left = this.map.getTile(this.x - 1, this.y);
    };
    Tile.prototype.right = function() {
      if (this._right) {
        return this._right;
      }
      return this._right = this.map.getTile(this.x + 1, this.y);
    };
    Tile.prototype.up = function() {
      if (this._up) {
        return this._up;
      }
      return this._up = this.map.getTile(this.x, this.y - 1);
    };
    Tile.prototype.down = function() {
      if (this._down) {
        return this._down;
      }
      return this._down = this.map.getTile(this.x, this.y + 1);
    };
    return Tile;
  })();
  window.Tile = Tile;
}).call(this);

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
      this.tiles = [];
      _(_.range(this.width)).each(_(function(x) {
        return _(_.range(this.height)).each(_(function(y) {
          var tile;
          tile = new Tile(this, x, y);
          return this.tiles.push(tile);
        }).bind(this));
      }).bind(this));
      _(10).times(_(function() {
        var tile;
        tile = this.tiles[Math.floor(Math.random() * this.tiles.length)];
        while (tile.converted) {
          tile = this.tiles[Math.floor(Math.random() * this.tiles.length)];
        }
        return tile.converted = true;
      }).bind(this));
    }
    Map.prototype.convertedTiles = function() {
      return _(this.tiles).reject(function(tile) {
        return !tile.converted;
      });
    };
    Map.prototype.usedTileCount = function() {
      return (_(this.tiles).reject(function(tile) {
        return !tile.occupied();
      })).length;
    };
    Map.prototype.getTile = function(x, y) {
      if ((x < 0) || (y < 0) || (x > this.width) || (y > this.height)) {
        return null;
      }
      return this.tiles[(x * this.height) + y];
    };
    return Map;
  })();
  window.Map = Map;
}).call(this);

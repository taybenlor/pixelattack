(function() {
  var BUILDRATE, COSTS, DAMAGE, HEALTH, RANGE, Tower;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  COSTS = {
    "default": 5,
    slow: 10,
    area: 10
  };
  DAMAGE = {
    "default": 0.2,
    slow: 0.0,
    area: 0.1
  };
  HEALTH = {
    "default": 100,
    slow: 75,
    area: 150
  };
  BUILDRATE = {
    "default": 0.01,
    slow: 0.02,
    area: 0.005
  };
  RANGE = {
    "default": 5,
    slow: 1,
    area: 3
  };
  Tower = (function() {
    __extends(Tower, Model);
    function Tower(creator, type) {
      this.creator = creator;
      Tower.__super__.constructor.apply(this, arguments);
      if (!type) {
        type = "default";
      }
      this.attr("type", {
        "default": type
      });
      this.attr("attacking", {
        "default": null
      });
      this.attr("buildage", {
        "default": 0
      });
      this.attr("built", {
        "default": false
      });
      this.attr("health", {
        "default": HEALTH[this.type]
      });
    }
    Tower.prototype.cost = function() {
      return COSTS[this.type];
    };
    Tower.prototype.build = function(ticks) {
      this.buildage = _([1.0, ticks * BUILDRATE[this.type]]).min;
      return this.built = this.buildage >= 1.0;
    };
    Tower.prototype.damage = function(amount) {
      this.health -= amount;
      return this.buildage = this.health / HEALTH[this.type];
    };
    Tower.prototype.alive = function() {
      return this.health > 0;
    };
    Tower.prototype.attack = function(map, tile) {
      return map.nearestWithin(Enemy, tile, RANGE[this.type]);
    };
    return Tower;
  })();
  window.Tower = Tower;
}).call(this);

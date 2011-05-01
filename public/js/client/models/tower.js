(function() {
  var COST, DAMAGE, HEALTH, RANGE, RELOAD, Tower;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  COST = {
    "default": 5,
    cannon: 10,
    area: 10
  };
  DAMAGE = {
    "default": 4,
    cannon: 10,
    area: 1
  };
  HEALTH = {
    "default": 100,
    cannon: 150,
    area: 75
  };
  RANGE = {
    "default": 2,
    cannon: 5,
    area: 1
  };
  RELOAD = {
    "default": 500,
    cannon: 5000,
    area: 100
  };
  Tower = (function() {
    __extends(Tower, Model);
    function Tower(tile, type) {
      this.tile = tile;
      this.type = type;
      Tower.__super__.constructor.apply(this, arguments);
      if (!this.type) {
        this.type = "default";
      }
      this.attr("attacking", {
        "default": false
      });
      this.attr("health", {
        "default": HEALTH[this.type]
      });
      this.attr("destroyed", {
        "default": false
      });
      this.last_attack = ticks;
    }
    Tower.prototype.attack = function() {
      var i, t, target, _i, _len, _ref, _ref10, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _results;
      this.last_attack = ticks;
      if (this.type === "default") {
        target = breadth_first(this.tile, RANGE[this.type], function(t) {
          return t.thing instanceof Enemy;
        });
        if (target && target.thing) {
          this.attacking = true;
          return target.thing.damage(DAMAGE[this.type]);
        }
      } else if (this.type === "area") {
        this.attacking = true;
        if ((_ref = this.tile.up()) != null) {
          if ((_ref2 = _ref.thing) != null) {
            _ref2.damage(DAMAGE[this.type]);
          }
        }
        if ((_ref3 = this.tile.left()) != null) {
          if ((_ref4 = _ref3.thing) != null) {
            _ref4.damage(DAMAGE[this.type]);
          }
        }
        if ((_ref5 = this.tile.down()) != null) {
          if ((_ref6 = _ref5.thing) != null) {
            _ref6.damage(DAMAGE[this.type]);
          }
        }
        return (_ref7 = this.tile.right()) != null ? (_ref8 = _ref7.thing) != null ? _ref8.damage(DAMAGE[this.type]) : void 0 : void 0;
      } else if (this.type === "cannon") {
        this.attacking = true;
        t = this.tile.right();
        _ref9 = _.range(RANGE[this.type]);
        _results = [];
        for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
          i = _ref9[_i];
          if (!t) {
            break;
          }
          if ((_ref10 = t.thing) != null) {
            _ref10.damage(DAMAGE[this.type]);
          }
          _results.push(t = t.right());
        }
        return _results;
      }
    };
    Tower.prototype.damage = function(amount) {
      this.health -= amount;
      return this.buildage = this.health / HEALTH[this.type];
    };
    Tower.prototype.alive = function() {
      return this.health > 0;
    };
    Tower.prototype.update = function() {
      if (this.attacking) {
        this.attacking = false;
      }
      if ((ticks - this.last_attack) > RELOAD[this.type]) {
        return this.attack();
      }
    };
    Tower.cost = function(type) {
      return COST[type];
    };
    return Tower;
  })();
  window.Tower = Tower;
}).call(this);

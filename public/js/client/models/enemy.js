(function() {
  var CONVERT_TIME, DAMAGE, Enemy, HEALTH, SPEED, VALUE;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  DAMAGE = {
    "default": 0.2,
    heavy: 0.0,
    fast: 0.1
  };
  HEALTH = {
    "default": 20,
    heavy: 50,
    fast: 30
  };
  SPEED = {
    "default": 3000,
    heavy: 5000,
    fast: 1000
  };
  VALUE = {
    "default": 1,
    heavy: 2,
    fast: 2
  };
  CONVERT_TIME = 6000;
  Enemy = (function() {
    __extends(Enemy, Model);
    function Enemy(tile, type, health) {
      Enemy.__super__.constructor.apply(this, arguments);
      if (!type) {
        type = "default";
      }
      if (!health) {
        health = HEALTH[this.type];
      }
      this.starting_health = health;
      this.attr("type", {
        "default": type
      });
      this.attr("attacking", {
        "default": false
      });
      this.attr("hit", {
        "default": false
      });
      this.attr("converting", {
        "default": false
      });
      this.attr("tile", {
        "default": tile
      });
      this.attr("destroyed", {
        "default": false
      });
      this.attr("health", {
        "default": health
      });
      this.tile.place(this);
      this.moved_at = ticks;
    }
    Enemy.prototype.damage = function(amount) {
      this.health -= amount;
      if (this.health <= 0) {
        return this.destroy();
      }
    };
    Enemy.prototype.alive = function() {
      return this.health > 0;
    };
    Enemy.prototype.attack = function(tile) {
      var _ref;
      this.attacking = true;
      return (_ref = tile.thing) != null ? _ref.damage(DAMAGE[this.type]) : void 0;
    };
    Enemy.prototype.stopAttacking = function() {
      return this.attacking = null;
    };
    Enemy.prototype.leaveTo = function(tile) {
      this.tile.clear();
      this.tile = tile;
      return this.tile.place(this);
    };
    Enemy.prototype.move = function() {
      this.moved_at = ticks;
      if (this.type === "heavy") {
        if (!this.target) {
          this.target = breadth_first(this.tile, 15, function(t) {
            return !t.converted;
          });
        }
        if (this.target === this.tile) {
          return this.startConverting();
        }
        if (this.target) {
          if (this.target.x < this.tile.x && this.tile.left() && !this.tile.left().occupied()) {
            return this.leaveTo(this.tile.left());
          } else if (this.target.x > this.tile.x && this.tile.right() && !this.tile.right().occupied()) {
            return this.leaveTo(this.tile.right());
          } else if (this.target.y > this.tile.y && this.tile.down() && !this.tile.down().occupied()) {
            return this.leaveTo(this.tile.down());
          } else if (this.target.y < this.tile.y && this.tile.up() && !this.tile.up().occupied()) {
            return this.leaveTo(this.tile.up());
          } else {
            this.target = null;
          }
        }
      }
      if (this.type === "fast") {
        if (!this.target || !(this.target.thing instanceof Tower)) {
          this.target = breadth_first(this.tile, 15, function(t) {
            return t.thing instanceof Tower;
          });
        }
        if (this.target) {
          if (distance(this.target, this.tile) <= 1) {
            return this.attack(this.target);
          } else if (this.target.x < this.tile.x && this.tile.left() && !this.tile.left().occupied()) {
            return this.leaveTo(this.tile.left());
          } else if (this.target.x > this.tile.x && this.tile.right() && !this.tile.right().occupied()) {
            return this.leaveTo(this.tile.right());
          } else if (this.target.y > this.tile.y && this.tile.down() && !this.tile.down().occupied()) {
            return this.leaveTo(this.tile.down());
          } else if (this.target.y < this.tile.y && this.tile.up() && !this.tile.up().occupied()) {
            return this.leaveTo(this.tile.up());
          } else {
            this.target = null;
          }
        }
      }
      if (this.tile.x === 0 && !this.tile.converted) {
        return this.startConverting();
      } else if (this.tile.left() && this.tile.left().converted && !this.tile.converted) {
        return this.startConverting();
      } else if (this.tile.left() && !this.tile.left().converted && !this.tile.left().occupied()) {
        return this.leaveTo(this.tile.left());
      } else if (this.tile.up() && !this.tile.up().converted && !this.tile.up().occupied()) {
        return this.leaveTo(this.tile.up());
      } else if (this.tile.down() && !this.tile.down().converted && !this.tile.down().occupied()) {
        return this.leaveTo(this.tile.down());
      } else if (this.tile.right() && !this.tile.right().converted && !this.tile.right().occupied()) {
        return this.leaveTo(this.tile.right());
      }
    };
    Enemy.prototype.destroy = function() {
      this.destroyed = true;
      return this.tile.clear();
    };
    Enemy.prototype.startConverting = function() {
      this.converting = true;
      return this.started_converting = ticks;
    };
    Enemy.prototype.convert = function() {
      this.tile.converted = true;
      return this.destroy();
    };
    Enemy.prototype.update = function() {
      if (this.converting) {
        if ((ticks - this.started_converting) > CONVERT_TIME) {
          return this.convert();
        }
      } else if ((ticks - this.moved_at) > SPEED[this.type]) {
        return this.move();
      }
    };
    Enemy.prototype.value = function() {
      return VALUE[this.type];
    };
    Enemy.types = ["default", "heavy", "fast"];
    Enemy.health = function(type) {
      return HEALTH[type];
    };
    return Enemy;
  })();
  window.Enemy = Enemy;
}).call(this);

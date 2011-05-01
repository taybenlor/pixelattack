(function() {
  var DIFF_INCREASE, DIFF_INTERVAL, Game, LOSS_DENSITY_COUNT, WAVE_PERCENTAGE;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  DIFF_INCREASE = 1.1;
  DIFF_INTERVAL = 30000;
  WAVE_PERCENTAGE = 0.1;
  LOSS_DENSITY_COUNT = 145;
  Game = (function() {
    __extends(Game, Model);
    function Game() {
      Game.__super__.constructor.apply(this, arguments);
      this.map = new Map();
      this.attr("score", {
        "default": 0
      });
      this.attr("lives", {
        "default": 0
      });
      this.attr("money", {
        "default": 10
      });
      this.attr("attack_interval", {
        "default": 2000
      });
      this.attr("enemy_count", {
        "default": 0
      });
      this.attr("finished", {
        "default": false
      });
      this.last_enemy = null;
      this.enemies = _([]);
      this.towers = _([]);
      this.difficulty = 1;
      this.last_difficulty = ticks;
    }
    Game.prototype.addEnemy = function() {
      var converted, number;
      converted = this.map.convertedTiles();
      number = Math.max(Math.floor(converted.length * WAVE_PERCENTAGE * this.difficulty), 1);
      _(number).times(_(function() {
        var enemy, tile, type;
        type = Enemy.types[Math.floor(Math.random() * 3)];
        tile = converted[Math.floor(Math.random() * converted.length)];
        if (!tile.occupied()) {
          enemy = new Enemy(tile, type, Enemy.health(type) * this.difficulty);
          this.enemies.push(enemy);
          return enemy.listen('destroyed', _(function(old_val, new_val) {
            if (new_val) {
              this.destroyEnemy(enemy);
            }
            return this.enemy_count -= number;
          }).bind(this));
        }
      }).bind(this));
      this.enemy_count += number;
      return this.last_enemy = ticks;
    };
    Game.prototype.destroyEnemy = function(enemy) {
      this.enemies = _(this.enemies.without(enemy));
      if (enemy.health <= 0) {
        this.score += enemy.value() * 100;
        return this.money += enemy.value();
      }
    };
    Game.prototype.destroyTower = function(tower) {
      return this.towers = _(this.towers.without(tower));
    };
    Game.prototype.build = function(tile, type) {
      var tower;
      if (Tower.cost(type) > this.money) {
        return false;
      }
      if (tile.converted) {
        return false;
      }
      if (tile.occupied()) {
        return false;
      }
      tower = new Tower(tile, type);
      if (tile.place(tower)) {
        this.money -= Tower.cost(type);
        console.log(this.money);
        this.towers.push(tower);
        tower.listen('destroyed', _(function(old_val, new_val) {
          if (new_val) {
            return this.destroyTower(tower);
          }
        }).bind(this));
        return true;
      }
      return false;
    };
    Game.prototype.update = function() {
      if (this.last_enemy == null) {
        this.last_enemy = ticks;
      }
      if ((ticks - this.last_enemy) > this.attack_interval) {
        this.addEnemy();
      }
      this.enemies.each(_(function(enemy) {
        return enemy.update();
      }).bind(this));
      this.towers.each(_(function(tower) {
        return tower.update();
      }).bind(this));
      if ((ticks - this.last_difficulty) > DIFF_INTERVAL) {
        this.difficulty *= DIFF_INCREASE;
        this.last_difficulty = ticks;
        this.score += 250;
      }
      return this.last_tick = ticks;
    };
    return Game;
  })();
  window.Game = Game;
}).call(this);
